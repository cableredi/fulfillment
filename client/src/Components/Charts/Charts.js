import React from "react";
import { LineChart } from 'react-chartkick';
import 'chart.js';

export default function MainPage(props) {
  return (
    <LineChart data={props.data} />
  )
}