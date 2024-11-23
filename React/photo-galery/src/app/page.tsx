"use client";
import Image from "next/image";
import { photoList } from "./data/photoList";
import { PhotoItem } from "./components/photoItem";
import { useState } from "react";
import { Modal } from "./components/modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [imageOfModal, setImageOfModal] = useState("");

  function openModal(photoId: number) {
    const photoToShow = photoList.find((item) => item.id === photoId);
    if (!photoToShow) return;

    setImageOfModal(photoToShow.url);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center text-2xl">
      <h1 className="text-center text-3xl font-bold my-10">Photos</h1>

      <section className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photoList.map((item) => (
          <PhotoItem
            photo={item}
            key={item.id}
            onClickEvent={() => openModal(item.id)}
          />
        ))}
      </section>

      {showModal && <Modal image={imageOfModal} onClickEvent={closeModal} />}
    </div>
  );
}
