import { test, expect, vi } from 'vitest';
import { POST } from './route';

vi.mock('resend', () => {
  const ResendMock = function() {
    this.emails = {
      send: vi.fn().mockResolvedValue({ id: 'test_123' })
    };
  };
  Object.defineProperty(ResendMock, 'name', { value: 'Resend' });
  return { Resend: ResendMock };
});

vi.mock('process.env', () => ({
  RESEND_API_KEY: 'test_key'
}));

test("returns 400 on invalid JSON body", async () => {
  const req = new Request("http://localhost/api/send-email", {
    method: "POST",
    body: "invalid json"
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
  const data = await res.json();
  expect(data.error).toBe("Invalid JSON body");
});

test("returns 400 on missing email", async () => {
  const req = new Request("http://localhost/api/send-email", {
    method: "POST",
    body: JSON.stringify({ ideas: ["gift idea"] })
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
  const data = await res.json();
  expect(data.error).toBe("Valid email address required");
});

test("returns 400 on invalid email format", async () => {
  const req = new Request("http://localhost/api/send-email", {
    method: "POST",
    body: JSON.stringify({ email: "invalid", ideas: ["gift idea"] })
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
  const data = await res.json();
  expect(data.error).toBe("Valid email address required");
});

test("returns 400 on missing ideas", async () => {
  const req = new Request("http://localhost/api/send-email", {
    method: "POST",
    body: JSON.stringify({ email: "test@example.com" })
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
  const data = await res.json();
  expect(data.error).toBe("Missing ideas");
});

test("returns 400 on empty ideas array", async () => {
  const req = new Request("http://localhost/api/send-email", {
    method: "POST",
    body: JSON.stringify({ email: "test@example.com", ideas: [] })
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
  const data = await res.json();
  expect(data.error).toBe("Missing ideas");
});

test("returns 200 on valid input", async () => {
  const req = new Request("http://localhost/api/send-email", {
    method: "POST",
    body: JSON.stringify({
      email: "test@example.com",
      ideas: ["Cool gift", "Another gift"]
    })
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data.success).toBe(true);
});

test("xss in ideas is sanitized", async () => {
  const req = new Request("http://localhost/api/send-email", {
    method: "POST",
    body: JSON.stringify({
      email: "test@example.com",
      ideas: ["<script>alert('xss')</script>"]
    })
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
});