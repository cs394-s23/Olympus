import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('App tests', () => {
  test("App should render", () => {
    render(<App />);
    expect(screen.getByText('Workout Volume Dashboard')).toBeDefined();
    expect(screen.getByText('1 Rep Max Dashboard')).toBeDefined();
  });
});