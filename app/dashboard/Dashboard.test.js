import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './page';

jest.mock('@/lib/supabase', () => ({
  auth: {
    getUser: jest.fn(() => Promise.resolve({ data: { user: { id: 'user-id', email: 'test@example.com' } } })),
    signOut: jest.fn(() => Promise.resolve()),
  },
  from: jest.fn(() => ({
    select: jest.fn(() => Promise.resolve({ data: [{ id: 1, title: 'Test Bookmark', url: 'https://example.com' }], error: null })),
    insert: jest.fn(() => Promise.resolve({ error: null })),
    delete: jest.fn(() => Promise.resolve({ error: null })),
    order: jest.fn(() => Promise.resolve({ data: [{ id: 1, title: 'Test Bookmark', url: 'https://example.com' }], error: null })),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Dashboard', () => {
  it('should delete a bookmark when the delete button is clicked', async () => {
    render(<Dashboard />);

    const deleteButton = await screen.findByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Bookmark')).toBeNull();
  });
});
