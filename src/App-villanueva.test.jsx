import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

// This tests the OneRMDashboard and Volume Dashboard
describe('App tests', () => {
  test("App should render", () => {
    render(<App />);
    expect(screen.getByText('Choose a user:')).toBeDefined();
  });
  
  test('Displaying correct exercise', () => {
    render(<App />);
    const continueButton = screen.getByTestId('continue-button');
    fireEvent.click(continueButton);

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