"use server"

import { prisma } from "@/lib/prisma"

export async function getTrano () {

    const tranos = await prisma.trano.findMany()

    return tranos
}
