import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../page';
import { login } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('next/navigation');
jest.mock('@/services/auth.service');
jest.mock('@/contexts/AuthContext');

const mockPush = jest.fn();
const mockLogin = jest.fn();
const mockSetAuthUser = jest.fn();

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({ login: mockSetAuthUser });
    (login as jest.Mock).mockImplementation(mockLogin);
  });

  it('should render login form', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should handle successful login', async () => {
    const mockResponse = {
      accessToken: 'token',
      refreshToken: 'refresh',
      user: {
        id: '1',
        username: 'test',
        email: 'test@test.com',
        isStaff: false,
        profile: null,
      },
    };

    mockLogin.mockResolvedValue(mockResponse);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password123',
      });
      expect(mockSetAuthUser).toHaveBeenCalledWith(mockResponse.user);
      expect(mockPush).toHaveBeenCalledWith('/main');
    });
  });

  it('should show error on failed login', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'wrong@test.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrong' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid/i)).toBeInTheDocument();
    });
  });

  it('should disable button while loading', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<LoginPage />);

    const button = screen.getByRole('button', { name: /login/i });

    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
