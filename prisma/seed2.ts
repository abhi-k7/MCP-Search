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
      logoUrl: 'https://logosandtypes.com/wp-content/uploads/2020/11/Asana.png'
    },
    {
      name: 'Intercom',
      category: 'Customer Support',
      description: 'Access real-time customer conversations, tickets, and user data—from Intercom.',
      documentation: 'https://mcp.intercom.com/sse',
      isRemote: true,
      userId: user.id,
      logoUrl: 'https://www.capterra.com/assets-bx-capterra/_next/image?url=https%3A%2F%2Fgdm-catalog-fmapi-prod.imgix.net%2FProductLogo%2F6a454b39-277e-4602-aaed-5412bfd47102.png&w=256&q=75'
    },
    {
      name: 'invideo',
      category: 'Video',
      description: 'Build video creation capabilities into your applications.',
      documentation: 'https://mcp.invideo.io/sse',
      isRemote: true,
      userId: user.id,
      logoUrl: 'https://x5h8w2v3.delivery.rocketcdn.me/wp-content/uploads/2025/03/Logo-Invideo-AI.png'
    },
    {
      name: 'Linear',
      category: 'Issue Tracking',
      description: 'Integrate with Linear’s issue tracking and project management system.',
      documentation: 'https://mcp.linear.app/sse',
      isRemote: true,
      userId: user.id,
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxh-ehr-zuOE7bQqm2Whuom2ZZtAa-yhFzhg&s'
    },
    {
      name: 'PayPal',
      category: 'Payments',
      description: 'Integrate PayPal commerce capabilities.',
      documentation: 'https://mcp.paypal.com/sse',
      isRemote: true,
      userId: user.id,
      logoUrl: 'https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_640.png'
    },
    {
      name: 'Plaid',
      category: 'Finance',
      description: 'Analyze, troubleshoot, and optimize Plaid integrations.',
      documentation: 'https://api.dashboard.plaid.com/mcp/sse',
      isRemote: true,
      userId: user.id,
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToCs8hfUPLeOhJBSkFmbF6Z0lSShtoY68axA&s'
    },
    {
      name: 'Square',
      category: 'Payments',
      description: 'Use an agent to build on Square APIs. Payments, inventory, orders, and more.',
      documentation: 'https://mcp.squareup.com/sse',
      isRemote: true,
      userId: user.id,
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Square%2C_Inc_-_Square_Logo.jpg'
    },
    {
      name: 'Workato',
      category: 'Integration',
      description: 'Access any application, workflows or data via Workato, made accessible for AI',
      documentation: 'https://workato.com/mcp', // placeholder if none provided
      isRemote: true,
      userId: user.id,
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk1mzh8iw9JLb36etof_BN65n6Xxho3heuXg&s'
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
