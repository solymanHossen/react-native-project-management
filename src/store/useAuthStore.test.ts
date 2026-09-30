import { act } from '@testing-library/react-native';
import { useAuthStore } from './useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.getState().signOut();
    });
  });

  it('initializes with logged-out state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('handles successful sign-in', async () => {
    let success = false;
    await act(async () => {
      success = await useAuthStore.getState().signIn({
        email: 'john@example.com',
        password: 'password123',
      });
    });

    const state = useAuthStore.getState();
    expect(success).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('john@example.com');
    expect(state.error).toBeNull();
  });

  it('handles failed sign-in with invalid credentials', async () => {
    let success = true;
    await act(async () => {
      success = await useAuthStore.getState().signIn({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      });
    });

    const state = useAuthStore.getState();
    expect(success).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBeTruthy();
  });

  it('handles sign-out correctly', async () => {
    await act(async () => {
      await useAuthStore.getState().signIn({
        email: 'john@example.com',
        password: 'password123',
      });
    });

    act(() => {
      useAuthStore.getState().signOut();
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
