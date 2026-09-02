export type Cell = {
    id: string;
    row: number;
    col: number;
    regionId: string;
    solution: number;
    isGiven: boolean;
}

export type Puzzle = {
    id: string;
    rows: number;
    cols: number;
    cells: Cell[];
}

export const puzzleOne: Puzzle = {
    id: "puzzle-1",
    rows: 4,
    cols: 4,
    cells: [

        // row 0
      {
        id: "0-0",
        row: 0,
        col: 0,
        regionId: "A",
        solution: 1,
        isGiven: true,
      },
      {
        id: "0-1",
        row: 0,
        col: 1,
        regionId: "A",
        solution: 2,
        isGiven: false,
      },
      {
        id: "0-2",
        row: 0,
        col: 2,
        regionId: "A",
        solution: 3,
        isGiven: false,
      },
      {
        id: "0-3",
        row: 0,
        col: 3,
        regionId: "A",
        solution: 4,
        isGiven: true,
      },

      // row 1
      {
        id: "1-0",
        row: 1,
        col: 0,
        regionId: "B",
        solution: 3,
        isGiven: false,
      },
      {
        id: "1-1",
        row: 1,
        col: 1,
        regionId: "B",
        solution: 4,
        isGiven: true,
      },
      {
        id: "1-2",
        row: 1,
        col: 2,
        regionId: "C",
        solution: 1,
        isGiven: false,
      },
      {
        id: "1-3",
        row: 1,
        col: 3,
        regionId: "C",
        solution: 2,
        isGiven: false,
      },

      // row 2
      {
        id: "2-0",
        row: 2,
        col: 0,
        regionId: "B",
        solution: 2,
        isGiven: false,
      },
      {
        id: "2-1",
        row: 2,
        col: 1,
        regionId: "B",
        solution: 1,
        isGiven: false,
      },
      {
        id: "2-2",
        row: 2,
        col: 2,
        regionId: "C",
        solution: 4,
        isGiven: true,
      },
      {
        id: "2-3",
        row: 2,
        col: 3,
        regionId: "C",
        solution: 3,
        isGiven: false,
      },

          // Row 3
        {
        id: "3-0",
        row: 3,
        col: 0,
        regionId: "D",
        solution: 4,
        isGiven: false,
      },
      {
        id: "3-1",
        row: 3,
        col: 1,
        regionId: "D",
        solution: 3,
        isGiven: false,
      },
      {
        id: "3-2",
        row: 3,
        col: 2,
        regionId: "D",
        solution: 2,
        isGiven: false,
      },
      {
        id: "3-3",
        row: 3,
        col: 3,
        regionId: "D",
        solution: 1,
        isGiven: true,
      },
    ],
  }