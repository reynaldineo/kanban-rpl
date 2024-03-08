import Button from "@/components/Button";
import Modal from "@/components/Modal";
import useAuthStore from "@/stores/useAuthStore";
import { useState } from "react";

type ModalReturnType = {
  openModal: () => void;
};

export default function LogoutModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  // * ====== Modal ======
  const [open, setOpen] = useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  const { logout, isLoading } = useAuthStore();

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Logout">
        <Modal.Section>
          <p className="mt-2 md:mt-0 mb-3">Are you sure you want to log out?</p>
          <div className="flex justify-end space-x-3">
            <Button onClick={() => setOpen(false)} variant="gray">
              Cancel
            </Button>
            <Button
              onClick={() => logout()}
              isLoading={isLoading}
              variant="danger"
            >
              Logout
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
