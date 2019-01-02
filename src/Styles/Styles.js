import React from "react";
import { StyleSheet, Platform } from "react-native";
import { fontSizeValues } from "./PixelRatioValues";
const tintColor = "#2f95dc";

export const colors = {
  my_app_text_color: "#000000",

  background_header: "#444444", // #F2F6F6 #00AEE7 #0099E1
  header_icon_color: "#FFFFFF", //#666666',
  button_underlay_color: "#05A5D1",
  icon_color: "#7F7F7F",
  place_holder_text_color: "#C1C1C1",
  selection_color: "#078AD2",
  text_input_border_bottom_color: "#B6B6B6",
  text_input_border_bottom_color_active: "#078AD2",
  radio_icon_color: "#4177F6",
  icon_color_disabled: "#BABABD",
  text_color_disabled: "#BABABD",
  text_color_enabled: "#4B4B4D",
  touchable_ripple_color: "#3498DB",
  touchable_ripple_success_color: "#2ECC71",
  touchable_ripple_error_color: "#E74C3C",

  tintColor,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColor,
  tabBar: "#fefefe",
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeBackground: tintColor,
  noticeText: "#fff",

  //OLD
  title_text_color: "#FFFFFF", // #0A0A0A

  form_label_color: "#2EA0A0",
  form_placeholder_color: "#C8C8C8",
  form_input_color: "#5D5D5D",
  form_error_color: "#FF0000",

  text_medium: "#666666", // light
  text_dark: "#5D5D5D",

  background_app: "#FFFFFF",

  background_status: "rgba(0, 0, 0, 1)", // #00AEE7
  background_button: "#00AEE7",
  button_plain_border_color: "#00AEE7",
  button_plain_font_color: "#00AEE7",
  coloured_text_color: "#00AEE7",

  app_icon_color: "#fb232c", //#00AFF0 #29C7F2 00AFF0

  app_right_header_color: "#2F3742",
  app_border_color: "#444444",

  header_button_border_color: "#9ADBE8",
  header_button_text_color: "#FFFFFF",

  button_background_color: "#008B8B",
  button_background_disabled: "#DFDFDF",
  button_text_color: "#FFFFFF",
  button_text_disabled: "#9FA7B9",

  color_button_background: "#008B8B",
  color_button_text: "#FFFFFF",
  punch_font_color: "#000000",

  color_orange_button_background: "#F09419",
  color_orange_button_text: "#FFFFFF",

  form_header_color: "#4A4A4A",

  general_header_color: "#1A9696"
};

export const values = {
  roboto_thin: "Roboto-Thin",
  roboto_light: "Roboto-Light",
  roboto_regular: "Roboto-Regular",
  roboto_medium: "Roboto-Medium",

  //OLD
  font_regular: "Roboto-Regular", // Normal //'font_regular': 'NotoSans-Bold',
  font_medium: "Roboto-Medium",
  font_light: "Roboto-Medium", //'Roboto-Light', // BOLD //'font_light': 'NotoSans-Regular',
  font_size_regular: 14,
  font_size_small: 12,
  font_size_smaller: 10,
  radio_size: 20,

  font_extrasmall_size: 10,
  font_small_size: 14,
  font_regular_size: 14, //16
  font_light_size: 18,
  punch_font_size: 17,

  button_height: 45,
  button_radius: 45,
  button_font_size: 16,

  header_button_height: 35,

  form_header_font_size: 20,

  general_header_font_size: 19
};

export const AppTextStyle = StyleSheet.create({
  MyAppText: {
    fontFamily: values.roboto_regular,
    color: "#343434",
    fontSize: values.font_size_regular
  },
  CallListPhoneText: {
    fontFamily: values.roboto_regular,
    color: "#636363",
    fontSize: values.font_size_small
  },
  CallListNoteText: {
    fontFamily: values.roboto_regular,
    color: "#636363",
    fontSize: values.font_size_smaller
  }
});

export const header = {
  headerStyle: {
    backgroundColor: colors.background_header
  }
};

export const addCallHeader = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56
  },
  block: {
    flex: 1
  },
  touchable: {
    flex: 1
  },
  touchableView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  text: {
    fontFamily: values.roboto_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular,
    paddingLeft: 10,
    //paddingTop:2,
    textAlignVertical: "center"
  }
});

export const global = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 20,
    paddingLeft: 12
  },
  headerText: {
    fontFamily: values.roboto_regular,
    fontSize: 16,
    color: "#4B4B4D"
  },
  radioRow: {
    paddingTop: 10,
    paddingLeft: 12
  },
  radioTouchableRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  radioLabel: {
    paddingLeft: 10,
    fontFamily: values.roboto_light,
    fontSize: 13,
    color: "#4B4B4D"
  },

  formValidationMessage: {
    marginLeft: 0
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
    //backgroundColor: "rgba(0,0,0,.2)"
  }
});

export const addCallScreen = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  firstRow: {
    paddingTop: 10
  },
  colLeft: {
    width: 70,
    alignItems: "center"
  },
  colRight: {
    width: 60,
    alignItems: "center"
  },
  inputView: {
    flex: 1,
    borderBottomWidth: 1
  },
  input: {
    borderWidth: 0,
    fontFamily: values.roboto_regular,
    fontSize: 14,
    color: "#4B4B4D"
  },
  dateTimeContainer: {
    flex: 1,
    flexDirection: "row"
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5
  },
  dateTextInput: {
    flex: 1
  },
  recurringView: {
    paddingTop: 13,
    paddingBottom: 13,
    alignItems: "center"
  }
});

export const tabs = {
  icons: {
    color: "#fff",
    top: Platform.OS === "ios" ? 2 : -4
  }
};

export const call_listing_screen = StyleSheet.create({
  date_text: {
    fontFamily: values.font_medium,
    textAlign: "center"
  },
  date_text_date_active: {
    fontSize: 17,
    color: "#FFFFFF"
  },
  date_text_date_inactive: {
    fontSize: 15,
    color: "#6BB0B0"
  },
  date_text_day_active: {
    fontSize: 13,
    color: "#FFFFFF"
  },
  date_text_day_inactive: {
    fontSize: 11,
    color: "#6BB0B0"
  },
  task: {
    fontFamily: values.font_medium,
    fontSize: 14,
    color: "#444444"
  },

  date_list: {
    height: 60,
    flexDirection: "row"
  },
  date_block: {
    flex: 1,
    height: 50,
    backgroundColor: "#008B8B",
    alignItems: "center",
    paddingTop: 5
  },
  date_text_inactive: {
    fontFamily: "roboto-medium",
    color: "#6BB0B0",
    fontSize: 12,
    textAlign: "center"
  },
  date_text_active: {
    fontFamily: "roboto-medium",
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center"
  },
  schedule_container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10
  },
  schedule_block: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  task_block: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E5E2",
    borderRadius: 2,
    shadowColor: "rgba(0, 0, 0, 0.75)",
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 2
    },
    elevation: 1
  },
  task_process: {
    width: 90,
    height: 108,
    backgroundColor: "#E7E5E2",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  task_detail: {
    flex: 1,
    height: 108,
    backgroundColor: "#FFFFFF",
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15
  },
  process_icon: {
    // paddingBottom:5
  },
  process_time: {
    textAlign: "center",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: values.font_medium,
    fontSize: 13,
    color: "#444444",
    paddingTop: 5
  },
  process_status: {
    fontFamily: values.font_regular,
    fontSize: 13,
    color: "#888785"
  },
  name: {
    fontSize: 17,
    fontFamily: values.font_medium,
    color: "#018B8B"
  },
  work: {
    fontSize: 13,
    fontFamily: values.font_medium,
    color: "#787878"
  },
  phone_block: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 3
  },
  phone_no: {
    flex: 1,
    fontSize: 12,
    fontFamily: values.font_regular,
    color: "#82817F",
    textAlign: "left"
  },
  address: {
    flex: 1,
    fontSize: 12,
    fontFamily: values.font_regular,
    color: "#82817F"
  }
});

//OLD
export const headers = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title_view: {
    flex: 1
  },
  text: {
    //paddingLeft: 10,
    fontFamily: values.roboto_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular,
    textAlign: "center"
  },
  tempText: {
    //paddingLeft: 10,
    fontFamily: values.roboto_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular
    //textAlign: 'center'
  }
});

// more info https://goo.gl/dqw4jF
export const header2 = {
  // background
  headerStyle: {
    backgroundColor: colors.background_header,
    borderBottomWidth: 1,
    borderBottomColor: colors.app_border_color,
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 0
    //paddingTop: statusBarHeight, //#TRANSPARENT
    //height: 50 + statusBarHeight, //#TRANSPARENT
    //height: statusBarHeight, //#TRANSPARENT
  },
  headerTitleStyle: {
    //flex:1, flexDirection:'row',  justifyContent: 'center', alignItems:'center', textAlign: 'center',
    //borderWidth: 2, borderColor: 'red'
  },
  // Back Arrow
  headerTintColor: colors.header_icon_color
};

export const headerTwo = {
  title_view: {
    //alignSelf: 'center',
    flex: 1
  },
  text: {
    //paddingLeft: 10,
    fontFamily: values.roboto_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular,
    textAlign: "center"
  },
  container_view: {
    //flex: 1,
    //flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingLeft: 10
  },
  app_icon: {
    paddingLeft: 8
  },
  right_header: {
    paddingRight: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  right_header_text: {
    color: colors.app_right_header_color,
    paddingRight: 15,
    fontSize: 20
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: colors.header_button_border_color,
    borderWidth: 1,
    borderRadius: 10,
    height: values.header_button_height,
    paddingLeft: 10,
    paddingRight: 10
  },
  button_text: {
    color: colors.header_button_text_color,
    fontSize: values.button_font_size,
    fontFamily: values.font_light
  },
  back_button: {
    flexDirection: "row"
    //alignSelf: 'flex-start',
  }
};

export const drawer = {
  activeBackgroundColor: "#F09419",
  activeTintColor: "#FFFFFF", // text color for active drawer items
  inactiveBackgroundColor: colors.background_dark,
  inactiveTintColor: "#4E4E4E", // text color for inactive drawer items
  // style object for text style
  labelStyle: {
    fontFamily: values.font_title,
    fontSize: values.font_title_size
  },
  // style object for the content section
  style: {
    backgroundColor: colors.background_dark
  }
};
