import { Dialog, Transition } from "@headlessui/react";
import React from "react";

export interface CustomModalProps {
  children?: JSX.Element[] | JSX.Element | string;
  show: boolean;
  onClose: () => void;
}

export default function CustomModal(props: CustomModalProps) {
  return (
    <Transition appear show={props.show} as={React.Fragment}>
      <Dialog
        open={props.show}
        onClose={props.onClose}
        as="div"
        className="relative z-10"
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="p-2">{props.children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
