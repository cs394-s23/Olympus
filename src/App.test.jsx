import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('App tests', () => {
  test("App should render", () => {
    render(<App />);
    expect(screen.getByText('Workout Volume Dashboard')).toBeDefined();
    expect(screen.getByText('1 Rep Max Dashboard')).toBeDefined();
  });

  test('Name should change after selecting from menu', () => {
    render(<App />);

    const menu = screen.getByTestId('athelete-menu');
    expect(menu.textContent).toContain('Scott');
    fireEvent.click(menu);

    const menuItem = screen.getByTestId('athelete-menu-item-Jake');
    fireEvent.click(menuItem);

    expect(menu.textContent).toContain('Jake');
  });
  
  test('Displaying correct exercise', () => {
    render(<App />);

    const exercises = screen.getByTestId('workout-options');
    expect(exercises.textContent).toContain('Bench Press');
    fireEvent.click(exercises);

    const exerciseItem = screen.getByTestId('workout-Squat');
    fireEvent.click(exerciseItem);

    expect(exercises.textContent).toContain('Squat');
  });
  
  test('Displaying correct split', () => {
    render(<App />);

    const volumeDashboard = screen.getByTestId("dashboard-toggle-volume");
    fireEvent.click(volumeDashboard);

    const split = screen.getByTestId('split-options');
    expect(split.textContent).toContain('Push 1');
    fireEvent.click(split);

    const splitItem = screen.getByTestId('split-options-Pull 1');
    fireEvent.click(splitItem);

    expect(split.textContent).toContain('Pull 1');
  });
});