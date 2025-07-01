import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst()
  if (!user) throw new Error('No user found to assign servers to.')

  const servers = [
    {
      name: 'Asana',
      category: 'Project Management',
      description: 'Interact with your Asana workspace through AI tools to keep projects on track.',
      documentation: 'https://mcp.asana.com/sse',
      isRemote: true,
      userId: user.id,
    },
    {
      name: 'Intercom',
      category: 'Customer Support',
      description: 'Access real-time customer conversations, tickets, and user data—from Intercom.',
      documentation: 'https://mcp.intercom.com/sse',
      isRemote: true,
      userId: user.id,
    },
    {
      name: 'invideo',
      category: 'Video',
      description: 'Build video creation capabilities into your applications.',
      documentation: 'https://mcp.invideo.io/sse',
      isRemote: true,
      userId: user.id,
    },
    {
      name: 'Linear',
      category: 'Issue Tracking',
      description: 'Integrate with Linear’s issue tracking and project management system.',
      documentation: 'https://mcp.linear.app/sse',
      isRemote: true,
      userId: user.id,
    },
    {
      name: 'PayPal',
      category: 'Payments',
      description: 'Integrate PayPal commerce capabilities.',
      documentation: 'https://mcp.paypal.com/sse',
      isRemote: true,
      userId: user.id,
    },
    {
      name: 'Plaid',
      category: 'Finance',
      description: 'Analyze, troubleshoot, and optimize Plaid integrations.',
      documentation: 'https://api.dashboard.plaid.com/mcp/sse',
      isRemote: true,
      userId: user.id,
    },
    {
      name: 'Square',
      category: 'Payments',
      description: 'Use an agent to build on Square APIs. Payments, inventory, orders, and more.',
      documentation: 'https://mcp.squareup.com/sse',
      isRemote: true,
      userId: user.id,
    },
    {
      name: 'Workato',
      category: 'Integration',
      description: 'Access any application, workflows or data via Workato, made accessible for AI',
      documentation: 'https://workato.com/mcp', // placeholder if none provided
      isRemote: true,
      userId: user.id,
    },
  ]

  await prisma.mcpServer.createMany({
    data: servers,
    skipDuplicates: true,
  })

  console.log('Seeded MCP servers successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
