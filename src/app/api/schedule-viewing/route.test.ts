import { POST } from './route';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

// Mock dependencies
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    lead: {
      findUnique: jest.fn(),
    },
  })),
}));

jest.mock('google-auth-library');
jest.mock('googleapis', () => ({
  google: {
    calendar: jest.fn(),
  },
}));

// Mock Next.js objects
const mockRequest = (body: any) => {
  return {
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;
};

const mockNextResponseJson = jest.fn();
jest.mock('next/server', () => ({
  NextResponse: {
    json: (...args: any[]) => {
      mockNextResponseJson(...args);
      // Return a mock response object
      return { status: args[1]?.status || 200, json: () => Promise.resolve(args[0]) };
    }
  }
}));


describe('POST /api/schedule-viewing', () => {
  let prisma: PrismaClient;
  let mockCalendar: any;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    prisma = new PrismaClient();

    // Setup default mock for google calendar
    mockCalendar = {
      events: {
        insert: jest.fn().mockResolvedValue({ data: { id: 'calendar-event-id' } }),
      },
    };
    (google.calendar as jest.Mock).mockReturnValue(mockCalendar);
  });

  it('should schedule a viewing and return success on valid input', async () => {
    const mockLead = {
      id: 'lead-123',
      clientName: 'John Doe',
      clientEmail: 'john.doe@example.com',
      message: 'I am interested in this property.',
      property: {
        id: 'prop-456',
        title: 'Beautiful Apartment',
      },
      agent: {
        id: 'agent-789',
        name: 'Agent Smith',
        email: 'agent.smith@example.com',
        googleRefreshToken: 'fake-refresh-token',
      },
    };
    (prisma.lead.findUnique as jest.Mock).mockResolvedValue(mockLead);

    const req = mockRequest({
      leadId: 'lead-123',
      startTime: '2024-01-01T10:00:00Z',
      endTime: '2024-01-01T11:00:00Z',
    });

    await POST(req);

    expect(prisma.lead.findUnique).toHaveBeenCalledWith({
      where: { id: 'lead-123' },
      include: { property: true, agent: true },
    });

    expect(OAuth2Client).toHaveBeenCalled();
    const mockOAuth2ClientInstance = (OAuth2Client as jest.Mock).mock.instances[0];
    expect(mockOAuth2ClientInstance.setCredentials).toHaveBeenCalledWith({
      refresh_token: 'fake-refresh-token',
    });

    expect(google.calendar).toHaveBeenCalledWith({ version: 'v3', auth: mockOAuth2ClientInstance });
    expect(mockCalendar.events.insert).toHaveBeenCalledWith({
      calendarId: 'primary',
      requestBody: {
        summary: `Prohlídka: ${mockLead.property.title}`,
        description: mockLead.message,
        start: { dateTime: '2024-01-01T10:00:00Z' },
        end: { dateTime: '2024-01-01T11:00:00Z' },
        attendees: [
          { email: mockLead.clientEmail, displayName: mockLead.clientName },
          { email: mockLead.agent.email, displayName: mockLead.agent.name },
        ],
      },
    });

    expect(mockNextResponseJson).toHaveBeenCalledWith({ success: true });
  });

  it('should return 400 if required fields are missing', async () => {
    const req = mockRequest({
      leadId: 'lead-123',
      // startTime is missing
    });

    await POST(req);

    expect(mockNextResponseJson).toHaveBeenCalledWith(
      { error: 'Chybějící parametry: leadId, startTime, endTime.' },
      { status: 400 }
    );
  });

  it('should return 404 if lead is not found', async () => {
    (prisma.lead.findUnique as jest.Mock).mockResolvedValue(null);

    const req = mockRequest({
      leadId: 'non-existent-lead',
      startTime: '2024-01-01T10:00:00Z',
      endTime: '2024-01-01T11:00:00Z',
    });

    await POST(req);

    expect(mockNextResponseJson).toHaveBeenCalledWith(
      { error: 'Agent nebo poptávka nenalezena.' },
      { status: 404 }
    );
  });

  it('should return 404 if agent has no googleRefreshToken', async () => {
    const mockLead = {
      id: 'lead-123',
      agent: { id: 'agent-789', googleRefreshToken: null },
      property: { id: 'prop-456' },
    };
    (prisma.lead.findUnique as jest.Mock).mockResolvedValue(mockLead);

    const req = mockRequest({ leadId: 'lead-123', startTime: '2024-01-01T10:00:00Z', endTime: '2024-01-01T11:00:00Z' });
    await POST(req);

    expect(mockNextResponseJson).toHaveBeenCalledWith({ error: 'Agent nebo poptávka nenalezena.' }, { status: 404 });
  });

  it('should return 500 if google calendar API fails', async () => {
    const mockLead = { id: 'lead-123', property: {}, agent: { googleRefreshToken: 'token' } };
    (prisma.lead.findUnique as jest.Mock).mockResolvedValue(mockLead);
    (mockCalendar.events.insert as jest.Mock).mockRejectedValue(new Error('Google API Error'));

    const req = mockRequest({ leadId: 'lead-123', startTime: '2024-01-01T10:00:00Z', endTime: '2024-01-01T11:00:00Z' });
    await POST(req);

    expect(mockNextResponseJson).toHaveBeenCalledWith({ error: 'Chyba při plánování schůzky.' }, { status: 500 });
  });
});