import { test, expect } from '@playwright/test';

test('Create Pet', async ({ request }) => {
  const response = await request.post("https://petstore.swagger.io/v2/pet", {
    data: {
      id: 4815162342,
      category: {
        id: 0,
        name: "insider"
      },
      photoUrls: [
        "string"
      ],
      tags: [
        {
          id: 0,
          name: "insider"
        }
      ],
      status: "sold"
    }
  });
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
});

test('Update Pet', async ({ request }) => {
  const response = await request.put("https://petstore.swagger.io/v2/pet", {
    data: {
      id: 4815162342,
      category: {
        id: 0,
        name: "insider2"
      },
      photoUrls: [
        "string"
      ],
      tags: [
        {
          id: 0,
          name: "insider2"
        }
      ],
      status: "sold"
    }
  });
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
});

test('Get Pet', async ({ request }) => {
  const response = await request.get("https://petstore.swagger.io/v2/pet/4815162342", {
  });
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
    expect(responseBody.category.name).toBe("insider2");
});

test('Delete Pet', async ({ request }) => {
  const response = await request.delete("https://petstore.swagger.io/v2/pet/4815162342", {
  });
    const responseBody = await response.json();
    expect(responseBody.code).toBe(200);
});