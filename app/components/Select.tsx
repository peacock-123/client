import {
  Select as ArkSelect,
  Portal,
  SelectContentProps,
  SelectRootProps,
  SelectValueTextProps,
  useSelectContext,
} from "@ark-ui/react";
import { CollectionItem } from "node_modules/@ark-ui/react/dist/types";
import { css, cx } from "styled-system/css";
import { hstack, vstack } from "styled-system/patterns";
import SvgChevronDown from "~/icons/lib/ChevronDown";
import SvgChevronUp from "~/icons/lib/ChevronUp";

export const Select = Object.assign(Root, {
  Content,
  FieldBox,
  ItemGroup,
});

function Root<T extends CollectionItem>(props: SelectRootProps<T>) {
  return (
    <ArkSelect.Root
      {...props}
      positioning={{ gutter: 8, ...props.positioning }}
    />
  );
}

function FieldBox({ placeholder, ...props }: SelectValueTextProps) {
  const { open } = useSelectContext();
  return (
    <ArkSelect.Trigger
      {...props}
      className={cx(
        hstack({
          borderRadius: "6",
          borderWidth: "1px",
          borderColor: "BG/LineColor",
          borderStyle: "solid",
          bgColor: "BG/CardBG",
          color: "Text/20",
          py: "12",
          pr: "12",
          pl: "16",
          justify: "space-between",
          width: "320",
          textStyle: "Body/14/M",
          "&[data-state=open]": {
            borderColor: "Primary",
          },
          "&[data-placeholder-shown]": {
            color: "Text/60",
          },
        }),
        props.className
      )}
    >
      <ArkSelect.ValueText placeholder={placeholder} />
      <ArkSelect.Indicator>
        {open ? <SvgChevronUp /> : <SvgChevronDown />}
      </ArkSelect.Indicator>
    </ArkSelect.Trigger>
  );
}

function Content(props: SelectContentProps) {
  return (
    <>
      <Portal>
        <ArkSelect.Positioner>
          <ArkSelect.Content
            {...props}
            className={vstack({
              width: "320",
              bgColor: "BG/LineColor",
              borderRadius: "4",
              p: "8",
            })}
          />
        </ArkSelect.Positioner>
      </Portal>
      <ArkSelect.HiddenSelect />
    </>
  );
}

function ItemGroup() {
  const { collection } = useSelectContext();
  return (
    <ArkSelect.ItemGroup
      className={css({
        width: "100%",
        textStyle: "Body/14/M",
        color: "Text/60",
        "& > div": {
          p: 12,
        },
        "& > [data-highlighted]": {
          color: "Text/10",
          bgColor: "BG/CardBG",
          borderRadius: "4",
        },
      })}
    >
      {collection.toArray().map((item) => (
        <ArkSelect.Item key={item.item} item={item}>
          <ArkSelect.ItemText>{item.item}</ArkSelect.ItemText>
        </ArkSelect.Item>
      ))}
    </ArkSelect.ItemGroup>
  );
}

export const Basic = () => {
  const items = ["React", "Solid", "Vue"];
  return (
    <ArkSelect.Root items={items}>
      <ArkSelect.Label>Framework</ArkSelect.Label>
      <ArkSelect.Control>
        <ArkSelect.Trigger>
          <ArkSelect.ValueText placeholder="ArkSelect a Framework" />
          <ArkSelect.Indicator>hi</ArkSelect.Indicator>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner>
          <ArkSelect.Content>
            <ArkSelect.ItemGroup>
              <ArkSelect.ItemGroupLabel>Frameworks</ArkSelect.ItemGroupLabel>
              {items.map((item) => (
                <ArkSelect.Item key={item} item={item}>
                  <ArkSelect.ItemText>{item}</ArkSelect.ItemText>
                  <ArkSelect.ItemIndicator>✓</ArkSelect.ItemIndicator>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
  );
};