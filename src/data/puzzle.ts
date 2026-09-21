export type Cell = {
  id: string;
  row: number;
  col: number;
  regionId: string;
  solution: number;
  isGiven: boolean;
};

export type Puzzle = {
  id: string;
  rows: number;
  cols: number;
  cells: Cell[];
};

export const puzzleOne: Puzzle = {
  id: "puzzle-1",
  rows: 5,
  cols: 5,
  cells: [
    // Row 0
    {
      id: "0-0",
      row: 0,
      col: 0,
      regionId: "H",
      solution: 1,
      isGiven: false,
    },
    {
      id: "0-1",
      row: 0,
      col: 1,
      regionId: "F",
      solution: 3,
      isGiven: true,
    },
    {
      id: "0-2",
      row: 0,
      col: 2,
      regionId: "F",
      solution: 1,
      isGiven: false,
    },
    {
      id: "0-3",
      row: 0,
      col: 3,
      regionId: "D",
      solution: 2,
      isGiven: false,
    },
    {
      id: "0-4",
      row: 0,
      col: 4,
      regionId: "D",
      solution: 1,
      isGiven: true,
    },

    // Row 1
    {
      id: "1-0",
      row: 1,
      col: 0,
      regionId: "E",
      solution: 4,
      isGiven: false,
    },
    {
      id: "1-1",
      row: 1,
      col: 1,
      regionId: "F",
      solution: 2,
      isGiven: false,
    },
    {
      id: "1-2",
      row: 1,
      col: 2,
      regionId: "F",
      solution: 5,
      isGiven: true,
    },
    {
      id: "1-3",
      row: 1,
      col: 3,
      regionId: "F",
      solution: 4,
      isGiven: false,
    },
    {
      id: "1-4",
      row: 1,
      col: 4,
      regionId: "B",
      solution: 3,
      isGiven: true,
    },

    // Row 2
    {
      id: "2-0",
      row: 2,
      col: 0,
      regionId: "E",
      solution: 1,
      isGiven: false,
    },
    {
      id: "2-1",
      row: 2,
      col: 1,
      regionId: "A",
      solution: 3,
      isGiven: true,
    },
    {
      id: "2-2",
      row: 2,
      col: 2,
      regionId: "A",
      solution: 1,
      isGiven: false,
    },
    {
      id: "2-3",
      row: 2,
      col: 3,
      regionId: "A",
      solution: 2,
      isGiven: false,
    },
    {
      id: "2-4",
      row: 2,
      col: 4,
      regionId: "B",
      solution: 1,
      isGiven: false,
    },

    // Row 3
    {
      id: "3-0",
      row: 3,
      col: 0,
      regionId: "E",
      solution: 2,
      isGiven: true,
    },
    {
      id: "3-1",
      row: 3,
      col: 1,
      regionId: "E",
      solution: 5,
      isGiven: false,
    },
    {
      id: "3-2",
      row: 3,
      col: 2,
      regionId: "C",
      solution: 4,
      isGiven: true,
    },
    {
      id: "3-3",
      row: 3,
      col: 3,
      regionId: "C",
      solution: 3,
      isGiven: false,
    },
    {
      id: "3-4",
      row: 3,
      col: 4,
      regionId: "B",
      solution: 4,
      isGiven: false,
    },

    // Row 4
    {
      id: "4-0",
      row: 4,
      col: 0,
      regionId: "G",
      solution: 1,
      isGiven: false,
    },
    {
      id: "4-1",
      row: 4,
      col: 1,
      regionId: "E",
      solution: 3,
      isGiven: false,
    },
    {
      id: "4-2",
      row: 4,
      col: 2,
      regionId: "C",
      solution: 2,
      isGiven: false,
    },
    {
      id: "4-3",
      row: 4,
      col: 3,
      regionId: "C",
      solution: 1,
      isGiven: false,
    },
    {
      id: "4-4",
      row: 4,
      col: 4,
      regionId: "B",
      solution: 2,
      isGiven: true,
    },
  ],
};
