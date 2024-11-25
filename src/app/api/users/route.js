export async function GET(request) {
    const data = [
      { id: 1, name: "Anna" },
      { id: 2, name: "Jarek" },
    ];
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }