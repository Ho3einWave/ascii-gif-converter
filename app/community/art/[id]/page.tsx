import React from "react";
import ArtDetailPage from "../../../../components/community/art-details";
import { getArtById } from "@/services/api/getArtById";

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    const art = await getArtById(id);
    return <ArtDetailPage id={id} art={art.data} />;
};

export default Page;
