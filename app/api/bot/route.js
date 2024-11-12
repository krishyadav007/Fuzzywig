import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

// Create a new entry
export async function POST(req) {
  try {
    // const { title, subtitle } = await req.json();
    const resp = await req.json();
    console.log(resp);
    const result = await prisma.bot.create({
      data: {
        title: title,
        subtitle: subtitle,
        files: {
          filename: "Firefighting.pdf",
          user: "7krishyadav@gmail.com",
          uploadedDate: "8th Dec 2022",
        },
      },
    })
    return NextResponse.json(result)
  } catch (error) {
    console.log(error);
    // return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Retrieve data
export async function GET(req) {
  try {
    const resp = req.query

    const bot = id 
      ? await prisma.bot.findUnique({ where: { id: Number(id) } })
      : await prisma.bot.findMany()

    return NextResponse.json(bot)
  } catch (error) {
    console.log(error);
    // return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Update an existing entry
export async function PUT(req) {
  try {
    const { id, title, subtitle } = await req.json()

    const updatedBot = await prisma.bot.update({
      where: { id: Number(id) },
      data: {
        title: title,
        subtitle: subtitle,
      },
    })

    return NextResponse.json(updatedBot)
  } catch (error) {
    console.log(error);
    // return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Delete an entry
export async function DELETE(req) {
  try {
    const { id } = await req.json()

    await prisma.bot.delete({
      where: { id: Number(id) },
    })

    return new NextResponse('Bot deleted successfully', { status: 200 })
  } catch (error) {
    console.log(error);
    // return new NextResponse('Internal Server Error', { status: 500 })
  }
}