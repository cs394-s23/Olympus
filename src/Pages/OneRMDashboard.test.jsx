import { describe, expect, test, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

// This tests the E1RM Dashboard for a single user

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

it('e1rm dashboard renders', () => {
  render(
    <BrowserRouter>
      <Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />
    </BrowserRouter>);
  screen.getByText("1 Rep Max Dashboard");
});


describe('E1RM Dashboard Tests', () => {
  it('Bench Press test', () => {
    render(
      <BrowserRouter>
        <Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />
      </BrowserRouter>);
    const exercises = screen.getByTestId('workout-options');
    fireEvent.click(exercises);
    var exerciseItem = screen.getByTestId('workout-Bench Press');
    fireEvent.click(exerciseItem);
    expect(exercises.textContent).toContain('Bench Press');
    
    //Test fail:
    expect(exercises.textContent).not.toContain('Squat');
  });

  it('Squat test', () => {
    render(
      <BrowserRouter>
        <Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />
      </BrowserRouter>);
    const exercises = screen.getByTestId('workout-options');
    fireEvent.click(exercises);
    var exerciseItem = screen.getByTestId('workout-Squat');
    fireEvent.click(exerciseItem);
    expect(exercises.textContent).toContain('Squat');
  });

  it('Deadlift test', () => {
    render(
      <BrowserRouter>
        <Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />
      </BrowserRouter>);
    const exercises = screen.getByTestId('workout-options');
    fireEvent.click(exercises);
    var exerciseItem = screen.getByTestId('workout-Deadlift');
    fireEvent.click(exerciseItem);
    expect(exercises.textContent).toContain('Deadlift');
  });

  it('Military Press test', () => {
    render(
      <BrowserRouter>
        <Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />
      </BrowserRouter>);

    const exercises = screen.getByTestId('workout-options');
    fireEvent.click(exercises);
    var exerciseItem = screen.getByTestId('workout-Military Press');
    fireEvent.click(exerciseItem);
    expect(exercises.textContent).toContain('Military Press');
  });

  it('Barbell Row test', () => {
    render(
      <BrowserRouter>
        <Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />
      </BrowserRouter>);

    const exercises = screen.getByTestId('workout-options');
    fireEvent.click(exercises);
    var exerciseItem = screen.getByTestId('workout-Barbell Row');
    fireEvent.click(exerciseItem);
    expect(exercises.textContent).toContain('Barbell Row');
  });

  it('Front Squat test', () => {
    render(
      <BrowserRouter>
        <Dashboard athleteName={athleteName} athleteList={athletes.filter(name => name !== athleteName)} />
      </BrowserRouter>);

    const exercises = screen.getByTestId('workout-options');
    fireEvent.click(exercises);
    var exerciseItem = screen.getByTestId('workout-Front Squat');
    fireEvent.click(exerciseItem);
    expect(exercises.textContent).toContain('Front Squat');
  });

});