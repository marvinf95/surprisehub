// app/api/generate/route.test.js
import { test, expect, vi } from 'vitest';
import { POST } from './route';

// Mocks VOR Import - Using a function that can be used with 'new'
vi.mock('openai', () => {
  const OpenAIMock = function() {
    this.chat = {
      completions: {
        create: vi.fn().mockResolvedValue({
          choices: [{
            message: { content: "1. Foo\n2. Bar\n3. Baz\n4. Qux\n5. Quux" }
          }]
        })
      }
    };
  };
  Object.defineProperty(OpenAIMock, 'name', { value: 'OpenAI' });
  
  return { default: OpenAIMock };
});

vi.mock("@/lib/ratelimit", () => ({
  ratelimit: {
    limit: vi.fn().mockResolvedValue({ 
      success: true, 
      limit: 100, 
      remaining: 99, 
      reset: 1234567890 
    })
  }
}));

// VITEST SYNTAX (nicht describe!)
test("returns 400 on invalid input", async () => {
  const req = new Request("http://localhost/api/generate", {
    method: "POST",
    body: JSON.stringify({})
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test("returns 200 on valid input", async () => {
  const req = new Request("http://localhost/api/generate", {
    method: "POST",
    body: JSON.stringify({
      age: "23", relationship: "friend", budget: "30",
      interests: "football", occasion: "birthday", lang: "en"
    })
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
  
  const data = await res.json();
  expect(data.ideas).toHaveLength(5);
});
