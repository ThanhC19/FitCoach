import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGoalByUserId } from '../controllers/goalsController.js'; 
import { Goal } from '../db.js';
import { mockGoals} from './mockData.js'

// Mock the Goal model
vi.mock('../db.js', () => ({
  Goal: {
    findOne: vi.fn(),
  },
}));

describe('getGoalByUserId', () => {

let req, res;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock Express Request and Response objects
    req = {
      params: { uid: '1' },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  it('should return 200 and the goal when found', async () => {
    Goal.findOne.mockResolvedValue(mockGoals);

    await getGoalByUserId(req, res);

    expect(Goal.findOne).toHaveBeenCalledWith({ where: { UID: '1' } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGoals);
  });

  it('should return 404 if no goal is found', async () => {
    Goal.findOne.mockResolvedValue(null);
    await getGoalByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Goal not found for this user',
    });
  });

  it('should return 500 if the database throws an error', async () => {
    // mocked error message of the controller 
    const errorMessage = 'Database connection failed';
    
    Goal.findOne.mockRejectedValue(new Error(errorMessage));
    await getGoalByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Server Error',
      error: errorMessage,
    });
  });
});