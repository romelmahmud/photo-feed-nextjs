"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, []);

  const handleClose = () => {
    router.back();
  };

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={handleClose}
      className="shadow-teal-700 shadow-md border border-teal-600 flex flex-col p-2 rounded-md  "
    >
      <span onClick={handleClose} className="flex justify-end cursor-pointer">
        <Image src="/icons/xmark.svg" alt="close" width={30} height={30} />
      </span>
      {children}
    </dialog>,
    document.getElementById("modal-root-content")
  );
}
