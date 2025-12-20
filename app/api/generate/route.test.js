import { vi } from "vitest";

// mock vor dem Import von POST
vi.mock("openai", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: "1. Foo\n2. Bar\n3. Baz\n4. Qux\n5. Quux",
                },
              },
            ],
          }),
        },
      },
    })),
  };
});

vi.mock("@/lib/ratelimit", () => ({
  ratelimit: {
    limit: vi.fn().mockResolvedValue({ success: true }),
  },
}));

import { POST } from "./route";

describe("POST /api/generate", () => {
  it("returns 400 on invalid input", async () => {
    const req = new Request("http://localhost/api/generate", {
      method: "POST",
      body: JSON.stringify({}), // invalid
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 200 on valid input", async () => {
    const req = new Request("http://localhost/api/generate", {
      method: "POST",
      body: JSON.stringify({
        age: "23",
        relationship: "friend",
        budget: "30",
        interests: "football",
        occasion: "birthday",
        lang: "en",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.ideas).toHaveLength(5);
  });
});