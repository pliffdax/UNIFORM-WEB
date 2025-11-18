import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('@/contexts/AuthContext');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('Navbar', () => {
  it('should show login button when not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Navbar />);

    expect(screen.getByText(/увійти/i)).toBeInTheDocument();
  });

  it('should show username and logout when authenticated', () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@test.com',
      isStaff: false,
      profile: null,
    };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Navbar />);

    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/вийти/i)).toBeInTheDocument();
  });

  it('should call logout on logout button click', () => {
    const mockLogout = jest.fn();

    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@test.com',
        isStaff: false,
        profile: null,
      },
      loading: false,
      isAuthenticated: true,
      login: jest.fn(),
      logout: mockLogout,
    });

    render(<Navbar />);

    fireEvent.click(screen.getByText(/вийти/i));

    expect(mockLogout).toHaveBeenCalled();
  });
});
