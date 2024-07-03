import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { NextResponse } from "next/server";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    await loadS3IntoPinecone(file_key);
    console.log("S3 file loaded into Pinecone");
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId: "1",
      })
      .returning({
        insertedId: chats.id,
      });
      console.log(chat_id);

    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
        data: "Chat created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
