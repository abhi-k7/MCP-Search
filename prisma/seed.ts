import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create a user to attach these servers to (or find an existing one)
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      username: 'testuser',
      clerkId: 'clerk_test',
    },
  });

  await prisma.mcpServer.createMany({
    data: [
      {
        name: 'Bright Data',
        category: 'Data',
        description: 'Discover, extract, and interact with the web - one interface powering automated access across the public internet.',
        documentation: 'https://brightdata.com/docs',
        logoUrl: '/globe.svg',
        userId: user.id,
        isRemote: false,
      },
      {
        name: 'AI Hub',
        category: 'AI',
        description: 'Centralized access to AI tools and APIs with simple integration.',
        documentation: 'https://aihub.dev/docs',
        logoUrl: '/window.svg',
        userId: user.id,
        isRemote: false,
      },
      {
        name: 'SearchIQ',
        category: 'Search',
        description: 'An API to power intelligent search across your internal or public datasets.',
        documentation: 'https://searchiq.dev/docs',
        logoUrl: '/file.svg',
        userId: user.id,
        isRemote: false,
      },
      {
        name: 'Zapier',
        category: 'Automation',
        description: '',
        documentation: 'https://mcp.zapier.com/api/mcp/mcp',
        logoUrl: null,
        githubUrl: null,
        userId: user.id,
        isRemote: true,
      },
      {
        name: 'Stripe',
        category: 'Payments',
        description: '',
        documentation: 'https://mcp.stripe.com/',
        logoUrl: null,
        githubUrl: null,
        userId: user.id,
        isRemote: true,
      },
      {
        name: 'HubSpot',
        category: 'CRM',
        description: '',
        documentation: 'https://app.hubspot.com/mcp/v1/http',
        logoUrl: null,
        githubUrl: null,
        userId: user.id,
        isRemote: true,
      },
      {
        name: 'Atlasian',
        category: 'Software Development',
        description: '',
        documentation: 'https://mcp.atlassian.com/v1/sse',
        logoUrl: null,
        githubUrl: null,
        userId: user.id,
        isRemote: true,
      },
      {
        name: 'Cloudflare Workers',
        category: 'Software Development',
        description: '',
        documentation: 'https://bindings.mcp.cloudflare.com/sse',
        logoUrl: null,
        githubUrl: null,
        userId: user.id,
        isRemote: true,
      },
      {
        name: 'Cloudflare Observability',
        category: 'Observability',
        description: '',
        documentation: 'https://observability.mcp.cloudflare.com/sse',
        logoUrl: null,
        githubUrl: null,
        userId: user.id,
        isRemote: true,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
