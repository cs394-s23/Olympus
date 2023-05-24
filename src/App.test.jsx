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
});