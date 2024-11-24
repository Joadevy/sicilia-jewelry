import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || ''),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const range = 'Products!A2:D' // Adjust this range based on your sheet structure

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    })

    const rows = response.data.values

    if (!rows || rows.length === 0) {
      return NextResponse.json([])
    }

    const products = rows.map((row) => ({
      id: row[0],
      name: row[1],
      price: parseFloat(row[2]),
      image: row[3],
    }))

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

