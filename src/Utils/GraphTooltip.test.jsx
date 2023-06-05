import { describe, expect, test, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GraphTooltip from './GraphTooltip';
import { BrowserRouter } from 'react-router-dom';

const athletes = [
  "Scott",
  "Kevin",
  "Kahlin",
  "Josh",
  "Mark",
  "Thomas",
  "Cate",
  "Madi",
  "Leigh",
  "Chaitra",
  "Mariel",
  "Jordan",
];

const athleteName = "Scott"

describe('Graph Tooltip tests', () => {
  it('Tooltip for comparison with friends, your e1rm', () => {
    let payload1 = [{dataKey: "e1rm", value: 250}]
    render(
      <GraphTooltip active={true} payload={payload1} label="1/1/31" compare_bool={true}/>
    )
    expect(screen.getByText('1/1/31 Your E1RM: 250 lbs')).toBeDefined();
  });

  it('Tooltip for comparison with friends, your volume', () => {
    let payload1 = [{dataKey: "weight", value: 250}]
    render(
      <GraphTooltip active={true} payload={payload1} label="1/1/31" compare_bool={true}/>
    )
    expect(screen.getByText('1/1/31 Your Volume: 250 lbs')).toBeDefined();
  });

  it("Tooltip for comparison with friends, friend's e1rm", () => {
    let payload1 = [{dataKey: "e1rm_friend", value: 230}]
    render(
      <GraphTooltip active={true} payload={payload1} label="1/1/31" compare_bool={true}/>
    )
    expect(screen.getByText("1/1/31 Friend's E1RM: 230 lbs")).toBeDefined();
  });

  it("Tooltip for comparison with friends, friend's volume", () => {
    let payload1 = [{dataKey: "weight_friend", value: 230}]
    render(
      <GraphTooltip active={true} payload={payload1} label="1/1/31" compare_bool={true}/>
    )
    expect(screen.getByText("1/1/31 Friend's Volume: 230 lbs")).toBeDefined();
  });

  it("Tooltip for your own data, e1rm", () => {
    let payload1 = [{value: 250, payload: {e1rm: 250, reps: 7}},
                    {value: 200}]
    render(
      <GraphTooltip active={true} payload={payload1} label="2/20/13" compare_bool={false}/>
    )
    expect(screen.getByText("2/20/13 E1RM: 250 lbs")).toBeDefined();
    expect(screen.getByText("2/20/13 Top Set: 200 lbs")).toBeDefined();
    expect(screen.getByText("Reps: 7")).toBeDefined();
  });

  it("Tooltip for your own data, volume", () => {
    let payload1 = [{value: 4000, payload: {volume: 4000}}]
    render(
      <GraphTooltip active={true} payload={payload1} label="2/20/13" compare_bool={false}/>
    )
    expect(screen.getByText("2/20/13 Volume: 4000 lbs")).toBeDefined();

    expect(screen.queryByText("2/20/13 E1RM: 250 lbs")).toBe(null);
  });

  it('If active=null, no tooltip should show up', () => {
    let payload1 = [{dataKey: "e1rm", value: 250}]
    render(
      <GraphTooltip active={false} payload={payload1} label="1/1/31" compare_bool={true}/>
    )
    expect(screen.queryByText('1/1/31 Your E1RM: 250 lbs')).toBe(null);
  });
})