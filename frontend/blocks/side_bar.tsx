import { Menu } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import EBox from "../components/UI/EBox";
import { AppBlock } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleOpen } from "../redux/reducers/nav/winSlice";

const SideBar: AppBlock = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const { t: tb } = useTranslation("blocks");

  const [open, setOpen] = useState(false);

  const blocks = useAppSelector((state) => state.window.available);
  const openBlocks = useAppSelector((state) => state.window.open);
  const active = useAppSelector((state) => state.window.active);

  return (
    <>
      <EBox className="relative z-[99] flex flex-1">
        <Menu>
          <Menu.Button className="mx-3 flex flex-1 cursor-pointer flex-row justify-between">
            <span className="my-auto">{t("title")}</span>
            <span
              onClick={() => {
                setOpen(!open);
              }}
              style={{
                cursor: "pointer",
                userSelect: "none",
              }}
              className="material-icons my-auto ml-auto"
            >
              menu
            </span>
          </Menu.Button>
          <Menu.Items className="top- absolute left-4">
            <EBox className="flex flex-col">
              {blocks.map((block, i) => (
                <Menu.Item key={i}>
                  {() => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: openBlocks[block]
                          ? "var(--background)"
                          : "var(--bg-active)",
                        fontWeight: active === block ? "bold" : "normal",
                        cursor: "pointer",
                        userSelect: "none",
                        marginBottom: i !== blocks.length - 1 ? "0.25rem" : "0",
                      }}
                      className="px-3 py-2"
                      onClick={() => {
                        dispatch(toggleOpen(block));
                      }}
                    >
                      {tb(block)}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </EBox>
          </Menu.Items>
        </Menu>
      </EBox>
    </>
  );
};

SideBar.block_name = "side_bar";

export default SideBar;
