import { describe, expect, test, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';

// This tests the Volume Dashboard for a single user

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

it('volume dashboard renders', () => {
  render(<Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />);
  screen.getByText("Workout Volume Dashboard");
});


describe('Volume dashboard tests', () => {

  it('Push 1 test', () => {
    render(<Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />);
    const volumeDashboard = screen.getByTestId("dashboard-toggle-volume");
    fireEvent.click(volumeDashboard);

    const split = screen.getByTestId('split-options');

    //Push 1 is default
    expect(split.textContent).toContain('Push 1');
    expect(split.textContent).not.toContain('Push 2');
  });

  it('Push 2 test', () => {
    render(<Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />);
    const volumeDashboard = screen.getByTestId("dashboard-toggle-volume");
    fireEvent.click(volumeDashboard);

    const split = screen.getByTestId('split-options');
    fireEvent.click(split);

    var splitItem = screen.getByTestId('split-options-Push 2');
    fireEvent.click(splitItem);
    expect(split.textContent).toContain('Push 2');
  });

  it('Pull 1 test', () => {
    render(<Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />);
    const volumeDashboard = screen.getByTestId("dashboard-toggle-volume");
    fireEvent.click(volumeDashboard);

    const split = screen.getByTestId('split-options');
    fireEvent.click(split);

    var splitItem = screen.getByTestId('split-options-Pull 1');
    fireEvent.click(splitItem);
    expect(split.textContent).toContain('Pull 1');
  });

  it('Pull 2 test', () => {
    render(<Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />);
    const volumeDashboard = screen.getByTestId("dashboard-toggle-volume");
    fireEvent.click(volumeDashboard);

    const split = screen.getByTestId('split-options');
    fireEvent.click(split);

    var splitItem = screen.getByTestId('split-options-Pull 2');
    fireEvent.click(splitItem);
    expect(split.textContent).toContain('Pull 2');
  });

  it('Legs 1 test', () => {
    render(<Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />);
    const volumeDashboard = screen.getByTestId("dashboard-toggle-volume");
    fireEvent.click(volumeDashboard);

    const split = screen.getByTestId('split-options');
    fireEvent.click(split);

    var splitItem = screen.getByTestId('split-options-Legs 1');
    fireEvent.click(splitItem);
    expect(split.textContent).toContain('Legs 1');
  });

  it('Legs 2 test', () => {
    render(<Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />);
    const volumeDashboard = screen.getByTestId("dashboard-toggle-volume");
    fireEvent.click(volumeDashboard);

    const split = screen.getByTestId('split-options');
    fireEvent.click(split);

    var splitItem = screen.getByTestId('split-options-Legs 2');
    fireEvent.click(splitItem);
    expect(split.textContent).toContain('Legs 2');
  });

});