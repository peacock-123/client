import {
  DatePicker as ArkDatePicker,
  DatePickerContentProps,
  DatePickerRootProps,
  DatePickerTableBodyProps,
  DatePickerTableCellTriggerProps,
  DatePickerTableHeadProps,
  DatePickerViewProps,
  Portal,
} from "@ark-ui/react";
import { UseDatePickerReturn } from "node_modules/@ark-ui/react/dist/components/date-picker/use-date-picker";
import { ReactNode } from "react";
import { css, cx } from "styled-system/css";
import { hstack } from "styled-system/patterns";
import { createContext } from "~/utils/createContext";

type DateValue = UseDatePickerReturn["weeks"][number][number];

const [DatePickerContext, useDatePickerContext] = createContext<{
  api: UseDatePickerReturn;
}>("DatePicker");

export const DatePicker = Object.assign(Root, {
  Trigger: ArkDatePicker.Trigger,
  Content,
  DayView,
  DayViewHead,
  DayViewBody,
  DayViewCell,
  Table: ArkDatePicker.Table,
  Navigator,
  Control: ArkDatePicker.Control,
  Input: ArkDatePicker.Input,
});

function Root(props: DatePickerRootProps) {
  return <ArkDatePicker.Root locale="ko" {...props} />;
}

function Content(props: DatePickerContentProps) {
  return (
    <Portal>
      <ArkDatePicker.Positioner>
        <ArkDatePicker.Content
          {...props}
          className={cx(css({ bgColor: "BG/CardBG", borderRadius: "6" }))}
        />
      </ArkDatePicker.Positioner>
    </Portal>
  );
}

function Navigator() {
  return (
    <ArkDatePicker.ViewControl
      className={hstack({
        gap: "16",
        justify: "center",
        pt: "20",
        pb: "16",
      })}
    >
      <ArkDatePicker.PrevTrigger>Prev</ArkDatePicker.PrevTrigger>
      <ArkDatePicker.ViewTrigger>
        <ArkDatePicker.RangeText
          className={css({
            color: "Text/10",
            textStyle: "Body/16/B",
          })}
        />
      </ArkDatePicker.ViewTrigger>
      <ArkDatePicker.NextTrigger>Next</ArkDatePicker.NextTrigger>
    </ArkDatePicker.ViewControl>
  );
}

function DayView({
  children,
  ...props
}: Omit<DatePickerViewProps, "children" | "view"> & {
  children: ReactNode;
}) {
  return (
    <ArkDatePicker.View {...props} view="day">
      <ArkDatePicker.Context>
        {(api) => (
          <DatePickerContext value={{ api }}>{children}</DatePickerContext>
        )}
      </ArkDatePicker.Context>
    </ArkDatePicker.View>
  );
}

function DayViewHead(props: DatePickerTableHeadProps) {
  const { api } = useDatePickerContext("DayViewHead");
  return (
    <ArkDatePicker.TableHead
      {...props}
      className={cx(css({ textStyle: "Caption/12/R", color: "Text/30" }))}
    >
      <ArkDatePicker.TableRow>
        {api.weekDays.map((weekDay) => (
          <ArkDatePicker.TableHeader
            key={weekDay.value.day}
            className={css({
              width: "48",
              height: "28",
            })}
          >
            {weekDay.short}
          </ArkDatePicker.TableHeader>
        ))}
      </ArkDatePicker.TableRow>
    </ArkDatePicker.TableHead>
  );
}

function DayViewBody({
  renderCell,
  ...rest
}: DatePickerTableBodyProps & {
  renderCell: (day: DateValue) => ReactNode;
}) {
  const { api } = useDatePickerContext("DayViewBody");
  return (
    <ArkDatePicker.TableBody {...rest}>
      {api.weeks.map((week) => (
        <ArkDatePicker.TableRow key={week[0].day}>
          {week.map(renderCell)}
        </ArkDatePicker.TableRow>
      ))}
    </ArkDatePicker.TableBody>
  );
}

function DayViewCell({
  day,
  children,
  ...restProps
}: {
  day: DateValue;
  children?: ReactNode;
} & DatePickerTableCellTriggerProps) {
  return (
    <ArkDatePicker.TableCell value={day}>
      <ArkDatePicker.TableCellTrigger
        {...restProps}
        className={css({
          textStyle: "Body/14/M",
          color: "Text/10",
          width: "48",
          height: "48",
          textAlign: "center",
          "&[data-disabled]": {
            color: "Text/60",
            textStyle: "Body/14/R",
          },
          "&[data-selected]": {
            textStyle: "Body/15/B",
            backgroundColor: "Primary",
            borderRadius: "50%",
          },
        })}
      >
        {day.day}
      </ArkDatePicker.TableCellTrigger>
    </ArkDatePicker.TableCell>
  );
}
