import momentDefault from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { chevronL, chevronR } from "./assets";
import Button from "./components/Button";
import Day from "./components/Day";
import Header from "./components/Header";
import { height, width } from "./components/util";

const DateRangePicker = ({
  moment,
  startDate,
  endDate,
  onChange,
  displayedDate,
  minDate,
  date,
  maxDate,
  range,
  dayHeaderTextStyle,
  dayHeaderStyle,
  backdropStyle,
  containerStyle,
  selectedStyle,
  selectedTextStyle,
  disabledStyle,
  dayStyle,
  dayTextStyle,
  disabledTextStyle,
  headerTextStyle,
  monthButtonsStyle,
  headerStyle,
  monthPrevButton,
  monthNextButton,
  children,
  buttonContainerStyle,
  buttonStyle,
  buttonTextStyle,
  presetButtons,
  open,
  setOpen,
  handleClose
} : any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weeks, setWeeks] = useState<any>([]);
  const [selecting, setSelecting] = useState(false);
  const [dayHeaders, setDayHeaders] = useState<any>([]);
  const _moment = moment || momentDefault;
  const mergedStyles = {
    backdrop: {
      ...styles.backdrop,
      ...backdropStyle,
    },
    container: {
      ...styles.container,
      ...containerStyle,
    },
    header: {
      ...styles.header,
      ...headerStyle,
    },
    headerText: {
      ...styles.headerText,
      ...headerTextStyle,
    },
    monthButtons: {
      ...styles.monthButtons,
      ...monthButtonsStyle,
    },
    buttonContainer: {
      ...styles.buttonContainer,
      ...buttonContainerStyle,
    },
  };

  const _onOpen = () => {
    onOpen();
  };

  const _onClose = () => {
    setOpen(false);
    setIsOpen(false);
    if(handleClose) handleClose();
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setSelecting(false);
    if (!endDate) {
      onChange({
        endDate: startDate,
      });
    }
  };

  const previousMonth = () => {
    onChange({
      displayedDate: _moment(displayedDate).subtract(1, "months"),
    });
  };

  const nextMonth = () => {
    onChange({
      displayedDate: _moment(displayedDate).add(1, "months"),
    });
  };

  const selected = useCallback((_date : any, _startDate : any, _endDate : any, __date : any) => {
    return (
      (_startDate &&
        _endDate &&
        _date.isBetween(_startDate, _endDate, null, "[]")) ||
      (_startDate && _date.isSame(_startDate, "day")) ||
      (__date && _date.isSame(__date, "day"))
    );
  }, []);

  const disabled = useCallback((_date : any, _minDate : any, _maxDate : any) => {
    return (
      (_minDate && _date.isBefore(_minDate, "day")) ||
      (_maxDate && _date.isAfter(_maxDate, "day"))
    );
  }, []);

  const today = () => {
    if (range) {
      setSelecting(true);
      onChange({
        date: null,
        startDate: _moment(),
        endDate: null,
        selecting: true,
        displayedDate: _moment(),
      });
    } else {
      setSelecting(false);
      onChange({
        date: _moment(),
        startDate: null,
        endDate: null,
        displayedDate: _moment(),
      });
    }
  };

  const thisWeek = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: _moment().startOf("week"),
      endDate: _moment().endOf("week"),
      displayedDate: _moment(),
    });
  };

  const thisMonth = () => {
    setSelecting(false);
    onChange({
      date: null,
      startDate: _moment().startOf("month"),
      endDate: _moment().endOf("month"),
      displayedDate: _moment(),
    });
  };

  const select = useCallback(
    (day : any) => {
      let _date = _moment(displayedDate).utc();
      _date.set("date", day);
      if (range) {
        if (selecting) {
          if (_date.isBefore(startDate, "day")) {
            setSelecting(true);
            onChange({ startDate: _date });
          } else {
            setSelecting(!selecting);
            onChange({ endDate: _date });
          }
        } else {
          setSelecting(!selecting);
          onChange({
            date: null,
            endDate: null,
            startDate: _date,
          });
        }
      } else {
        onChange({
          date: _date,
          startDate: null,
          endDate: null,
        });
      }
    },
    [_moment, displayedDate, onChange, range, selecting, startDate]
  );

  useEffect(() => {
    if (typeof open === "boolean") {
      if (open) onOpen();
      else if (!open) onClose();
    }
  }, [open]);

  useEffect(() => {
    function populateHeaders() {
      let _dayHeaders = [];
      for (let i = 0; i <= 6; ++i) {
        let day = _moment(displayedDate).weekday(i).format("dddd").substr(0, 2);
        _dayHeaders.push(
          <Header
            key={`dayHeader-${i}`}
            day={day}
            index={i}
            dayHeaderTextStyle={dayHeaderTextStyle}
            dayHeaderStyle={dayHeaderStyle}
          />
        );
      }
      return _dayHeaders;
    }

    function populateWeeks() {
      let _weeks = [];
      let week : any[] = [];
      let daysInMonth = displayedDate.daysInMonth();
      let startOfMonth = _moment(displayedDate).set("date", 1);
      let offset = startOfMonth.weekday();
      week = week.concat(
        Array.from({ length: offset }, (x, i) => (
          <Day empty key={"empty-" + i} />
        ))
      );
      for (let i = 1; i <= daysInMonth; ++i) {
        let _date = _moment(displayedDate).set("date", i);
        let _selected = selected(_date, startDate, endDate, date);
        let _disabled = disabled(_date, minDate, maxDate);
        week.push(
          <Day
            key={`day-${i}`}
            selectedStyle={selectedStyle}
            selectedTextStyle={selectedTextStyle}
            disabledStyle={disabledStyle}
            dayStyle={dayStyle}
            dayTextStyle={dayTextStyle}
            disabledTextStyle={disabledTextStyle}
            index={i}
            selected={_selected}
            disabled={_disabled}
            select={select}
          />
        );
        if ((i + offset) % 7 === 0 || i === daysInMonth) {
          if (week.length < 7) {
            week = week.concat(
              Array.from({ length: 7 - week.length }, (x, index) => (
                <Day empty key={"empty-" + index} />
              ))
            );
          }
          _weeks.push(
            <View key={"weeks-" + i} style={styles.week}>
              {week}
            </View>
          );
          week = [];
        }
      }
      return _weeks;
    }
    function populate() {
      let _dayHeaders = populateHeaders();
      let _weeks = populateWeeks();
      setDayHeaders(_dayHeaders);
      setWeeks(_weeks);
    }
    populate();
  }, [
    startDate,
    endDate,
    date,
    _moment,
    displayedDate,
    dayHeaderTextStyle,
    dayHeaderStyle,
    selected,
    disabled,
    minDate,
    maxDate,
    selectedStyle,
    selectedTextStyle,
    disabledStyle,
    dayStyle,
    dayTextStyle,
    disabledTextStyle,
    select,
  ]);

  const node = (
    <View>
      <TouchableWithoutFeedback onPress={_onOpen}>
        {children ? (
          children
        ) : (
          <View/>
        )}
      </TouchableWithoutFeedback>
    </View>
  );

  return isOpen ? (
    <>
      <View style={mergedStyles.backdrop}>
        <TouchableWithoutFeedback
          style={styles.closeTrigger}
          onPress={_onClose}
        >
          <View style={styles.closeContainer} />
        </TouchableWithoutFeedback>
        <View>
          <View style={mergedStyles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={previousMonth}>
                {monthPrevButton || (
                  <Image
                    resizeMode="contain"
                    style={mergedStyles.monthButtons}
                    source={chevronL}
                  ></Image>
                )}
              </TouchableOpacity>
              <Text style={mergedStyles.headerText}>
                {displayedDate.format("MMMM") +
                  " " +
                  displayedDate.format("YYYY")}
              </Text>
              <TouchableOpacity onPress={nextMonth}>
                {monthNextButton || (
                  <Image
                    resizeMode="contain"
                    style={mergedStyles.monthButtons}
                    source={chevronR}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
              {dayHeaders && (
                <View style={styles.dayHeaderContainer}>{dayHeaders}</View>
              )}
              {weeks}
            </View>
            {presetButtons && (
              <View style={mergedStyles.buttonContainer}>
                <Button
                  buttonStyle={buttonStyle}
                  buttonTextStyle={buttonTextStyle}
                  onPress={today}
                >
                  Today
                </Button>
                {range && (
                  <>
                    <Button
                      buttonStyle={buttonStyle}
                      buttonTextStyle={buttonTextStyle}
                      onPress={thisWeek}
                    >
                      This Week
                    </Button>
                    <Button
                      buttonStyle={buttonStyle}
                      buttonTextStyle={buttonTextStyle}
                      onPress={thisMonth}
                    >
                      This Month
                    </Button>
                  </>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
      {node}
    </>
  ) : (
    <>{node}</>
  );
};

export default DateRangePicker;


const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2147483647,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: width * 0.85,
  },
  closeTrigger: {
    width: width,
    height: height,
  },
  closeContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#efefef",
    borderBottomWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  calendar: {
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    color: "black",
  },
  monthButtons: {
    fontSize: 16,
    color: "black",
    width: 32,
    height: 32,
  },
  dayHeaderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  week: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
