import React from 'react';
import { StyleSheet } from 'react-native';
import { fontSizeValues } from './PixelRatioValues';

export const colors = {
  'background_header': '#444444', // #F2F6F6 #00AEE7 #0099E1
  'header_icon_color': '#FFFFFF', //#666666',
  'button_underlay_color': '#05A5D1',
  'icon_color': '#7F7F7F',
  'place_holder_text_color': '#C1C1C1',
  'selection_color': '#078AD2',
  'text_input_border_bottom_color': '#B6B6B6',
  'text_input_border_bottom_color_active': '#078AD2',
  'radio_icon_color': '#4177F6',
  'icon_color_disabled': '#BABABD',
  'text_color_disabled': '#BABABD',
  'text_color_enabled': '#4B4B4D',


  //OLD
  'title_text_color': '#FFFFFF', // #0A0A0A

  'form_label_color': '#2EA0A0',
  'form_placeholder_color': '#C8C8C8',
  'form_input_color': '#5D5D5D',
  'form_error_color': '#FF0000',


  'text_medium': '#666666', // light
  'text_dark': '#5D5D5D',

  'background_app': '#FFFFFF',


  'background_status': 'rgba(0, 0, 0, 1)', // #00AEE7
  'background_button': '#00AEE7',
  'button_plain_border_color': '#00AEE7',
  'button_plain_font_color': '#00AEE7',
  'coloured_text_color': '#00AEE7',

  'app_icon_color': '#fb232c', //#00AFF0 #29C7F2 00AFF0
  
  'app_right_header_color': '#2F3742',
  'app_border_color': '#444444',

  'header_button_border_color': '#9ADBE8',
  'header_button_text_color': '#FFFFFF',

  'button_background_color': '#008B8B',
  'button_background_disabled': '#DFDFDF',
  'button_text_color': '#FFFFFF',
  'button_text_disabled': '#9FA7B9',

  'color_button_background': '#008B8B',
  'color_button_text': '#FFFFFF',
  'punch_font_color': '#000000',

  'color_orange_button_background': '#F09419',
  'color_orange_button_text': '#FFFFFF',

  'form_header_color': '#4A4A4A',

  'general_header_color': '#1A9696',
};

export const values = {



  //OLD
  'font_regular': 'roboto-regular', // Normal //'font_regular': 'NotoSans-Bold',
  'font_medium': 'roboto-medium',
  'font_light': 'roboto-medium', //'Roboto-Light', // BOLD //'font_light': 'NotoSans-Regular',
  'font_size_regular': 14,
  'font_size_small': 14,
  'radio_size': 20,


  'font_extrasmall_size': 10,
  'font_small_size': 14,
  'font_regular_size': 14, //16
  'font_light_size': 18,
  'punch_font_size': 17,

  'button_height': 45,
  'button_radius': 45,
  'button_font_size': 16,

  'header_button_height': 35,

  'form_header_font_size': 20,

  'general_header_font_size': 19,
};

export const header = {
  headerStyle: {
    backgroundColor: colors.background_header,
  }
};

export const addCallHeader = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
  },
  block: {
    flex: 1
  },
  touchable: {
    flex: 1
  },
  touchableView: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    fontFamily: values.font_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular,
    paddingLeft:10, 
    //paddingTop:2, 
    textAlignVertical:'center'
  }
});

export const global = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    paddingTop:20, paddingLeft:12
  },
  headerText:{
    fontSize:18
  },
  radioRow:{
    paddingTop:10, paddingLeft:12
  },
  radioTouchableRow:{
    flexDirection:'row', justifyContent:'flex-start', alignItems:'center'
  },
  radioLabel: {
    paddingLeft:5
  }
});

export const addCallScreen = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  firstRow: {
    paddingTop: 10,
  },
  colLeft: {
    width: 70, alignItems: 'center',
  },
  colRight: {
    width: 60, alignItems: 'center',
  },
  inputView: {
    flex:1,
    borderBottomWidth: 1,
  },
  input: {
    borderWidth: 0,
  },
  dateTimeContainer: {
    flex:1, flexDirection:'row'
  },
  dateView: {
    flexDirection:'row',justifyContent:'space-between'
  },
  timeView: {
    flexDirection:'row',justifyContent:'space-between', marginLeft:5
  },
  dateTextInput: {
    flex:1
  },
  recurringView: {
    paddingTop:13, paddingBottom:13, alignItems:'center'
  }

});




//OLD
export const headers = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title_view: {
    flex: 1
  },
  text: {
    //paddingLeft: 10,
    fontFamily: values.font_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular,
    textAlign: 'center'
  },
  tempText: {
    //paddingLeft: 10,
    fontFamily: values.font_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular,
    //textAlign: 'center'
  },
});



// more info https://goo.gl/dqw4jF
export const header2 = {
  // background
  headerStyle: {
    backgroundColor: colors.background_header,
    borderBottomWidth: 1,
    borderBottomColor: colors.app_border_color,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
    //paddingTop: statusBarHeight, //#TRANSPARENT
    //height: 50 + statusBarHeight, //#TRANSPARENT
    //height: statusBarHeight, //#TRANSPARENT
  },
  headerTitleStyle: {
    //flex:1, flexDirection:'row',  justifyContent: 'center', alignItems:'center', textAlign: 'center',
    //borderWidth: 2, borderColor: 'red'
  },
  // Back Arrow
  headerTintColor: colors.header_icon_color,
};

export const headerTwo = {
  title_view: {
    //alignSelf: 'center',
    flex: 1,
  },
  text: {
    //paddingLeft: 10,
    fontFamily: values.font_regular,
    color: colors.title_text_color,
    fontSize: values.font_size_regular,
    textAlign: 'center'
  },
  container_view: {
    //flex: 1,
    //flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingLeft: 10
  },
  app_icon: {
    paddingLeft: 8,
  },
  right_header: {
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  right_header_text: {
    color: colors.app_right_header_color,
    paddingRight: 15,
    fontSize: 20
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.header_button_border_color,
    borderWidth: 1,
    borderRadius: 10,
    height: values.header_button_height,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button_text: {
    color: colors.header_button_text_color,
    fontSize: values.button_font_size,
    fontFamily: values.font_light,
  },
  back_button: {
    flexDirection: 'row',
    //alignSelf: 'flex-start',
  }
};

export const drawer = {
  activeBackgroundColor: '#F09419',
  activeTintColor: '#FFFFFF', // text color for active drawer items
  inactiveBackgroundColor: colors.background_dark,
  inactiveTintColor: '#4E4E4E', // text color for inactive drawer items
  // style object for text style
  labelStyle: {
    fontFamily: values.font_title,
    fontSize: values.font_title_size,
  },
  // style object for the content section
  style: {
    backgroundColor: colors.background_dark,
  },
};