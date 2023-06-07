import {describe, expect, test} from 'vitest';
import {parseOneRMData, getMaxOneRMDataPoints, parseVolumeData, getMaxVolumeDataPoints} from './DataUtils';

describe('Data utils tests', () => {
    test("parseOneRMData and getMaxOneRMDataPoints", () => {
        let data = [{
            "Unique ID": "60",
            "Date": "3/22/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "1",
            "Weight": "120",
            "Reps": "10",
            "Volume": "1200",
            "RPE": "6",
            "% 1RM": "",
            "E 1RM": ""
        },
        {
            "Unique ID": "61",
            "Date": "3/22/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "2",
            "Weight": "205",
            "Reps": "7",
            "Volume": "1435",
            "RPE": "7.5",
            "% 1RM": "76%",
            "E 1RM": "270"
        },
        {
            "Unique ID": "62",
            "Date": "3/22/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "3",
            "Weight": "250",
            "Reps": "5",
            "Volume": "1250",
            "RPE": "9",
            "% 1RM": "86%",
            "E 1RM": "290"
        },
        {
            "Unique ID": "63",
            "Date": "3/22/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "4",
            "Weight": "255",
            "Reps": "4",
            "Volume": "1020",
            "RPE": "9.5",
            "% 1RM": "91%",
            "E 1RM": "280"
        },
        {
            "Unique ID": "64",
            "Date": "3/22/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "5",
            "Weight": "255",
            "Reps": "4",
            "Volume": "1020",
            "RPE": "9.5",
            "% 1RM": "91%",
            "E 1RM": "280"
        },
        {
            "Unique ID": "65",
            "Date": "3/22/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "6",
            "Weight": "255",
            "Reps": "3",
            "Volume": "765",
            "RPE": "10",
            "% 1RM": "96%",
            "E 1RM": "265"
        },
        {
            "Unique ID": "66",
            "Date": "3/22/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "7",
            "Weight": "255",
            "Reps": "3",
            "Volume": "765",
            "RPE": "10",
            "% 1RM": "96%",
            "E 1RM": "265"
        },
        {
            "Unique ID": "207",
            "Date": "3/29/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "1",
            "Weight": "120",
            "Reps": "10",
            "Volume": "1200",
            "RPE": "6",
            "% 1RM": "",
            "E 1RM": ""
        },
        {
            "Unique ID": "208",
            "Date": "3/29/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "2",
            "Weight": "205",
            "Reps": "7",
            "Volume": "1435",
            "RPE": "7.5",
            "% 1RM": "76%",
            "E 1RM": "270"
        },
        {
            "Unique ID": "209",
            "Date": "3/29/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "3",
            "Weight": "255",
            "Reps": "5",
            "Volume": "1275",
            "RPE": "9",
            "% 1RM": "86%",
            "E 1RM": "295"
        },
        {
            "Unique ID": "210",
            "Date": "3/29/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "4",
            "Weight": "255",
            "Reps": "4",
            "Volume": "1020",
            "RPE": "9.5",
            "% 1RM": "91%",
            "E 1RM": "280"
        },
        {
            "Unique ID": "211",
            "Date": "3/29/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "5",
            "Weight": "255",
            "Reps": "4",
            "Volume": "1020",
            "RPE": "9.5",
            "% 1RM": "91%",
            "E 1RM": "280"
        },
        {
            "Unique ID": "212",
            "Date": "3/29/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "6",
            "Weight": "255",
            "Reps": "3",
            "Volume": "765",
            "RPE": "10",
            "% 1RM": "96%",
            "E 1RM": "265"
        },
        {
            "Unique ID": "213",
            "Date": "3/29/2023",
            "Workout Name": "Legs 1",
            "Exercise Name": "Squat",
            "Set Number": "7",
            "Weight": "255",
            "Reps": "3",
            "Volume": "765",
            "RPE": "10",
            "% 1RM": "96%",
            "E 1RM": "265"
        }]

        let newDataPoints = parseOneRMData(data)
        expect(newDataPoints.length).toBe(12)
        expect(newDataPoints.length).not.toBe(14)
        expect(newDataPoints[0].e1rm).toBe(270)
        expect(newDataPoints[0].reps).toBe(7)
        expect(newDataPoints[0].weight).toBe(205)

        let startDate = new Date("03/22/2023");

        let maxDataPoints = getMaxOneRMDataPoints(newDataPoints, startDate, false)
        expect(maxDataPoints.length).toBe(2)
        expect(maxDataPoints[0].e1rm).toBe(290)
        expect(maxDataPoints[0].weight).toBe(250)
        expect(maxDataPoints[0].date_string).toBe("3/22/2023")

        expect(maxDataPoints[1].e1rm).toBe(295)
        expect(maxDataPoints[1].weight).toBe(255)
        expect(maxDataPoints[1].date_string).toBe("3/29/2023")

    });

    test("parseVolumeData and getMaxVolumeDataPoints", () => {
        let data = [
            {
                "Unique ID": "1",
                "Date": "4/20/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Tricep Pushdown",
                "Set Number": "1",
                "Weight": "60",
                "Reps": "10",
                "Volume": "",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "2",
                "Date": "4/20/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Tricep Pushdown",
                "Set Number": "2",
                "Weight": "60",
                "Reps": "10",
                "Volume": "600",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "3",
                "Date": "4/20/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Tricep Pushdown",
                "Set Number": "3",
                "Weight": "60",
                "Reps": "10",
                "Volume": "600",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "4",
                "Date": "4/20/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "DB Front Raise",
                "Set Number": "1",
                "Weight": "40",
                "Reps": "10",
                "Volume": "400",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "5",
                "Date": "4/20/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "DB Front Raise",
                "Set Number": "2",
                "Weight": "40",
                "Reps": "10",
                "Volume": "400",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "6",
                "Date": "4/6/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "DB Front Raise",
                "Set Number": "3",
                "Weight": "40",
                "Reps": "10",
                "Volume": "",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "7",
                "Date": "4/6/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Bench Press",
                "Set Number": "1",
                "Weight": "120",
                "Reps": "10",
                "Volume": "1200",
                "RPE": "6",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "8",
                "Date": "4/6/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Bench Press",
                "Set Number": "2",
                "Weight": "165",
                "Reps": "7",
                "Volume": "1155",
                "RPE": "7.5",
                "% 1RM": "76%",
                "E 1RM": "215"
            },
            {
                "Unique ID": "9",
                "Date": "4/6/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Bench Press",
                "Set Number": "3",
                "Weight": "200",
                "Reps": "5",
                "Volume": "1000",
                "RPE": "9",
                "% 1RM": "86%",
                "E 1RM": "230"
            },
            {
                "Unique ID": "10",
                "Date": "4/6/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Bench Press",
                "Set Number": "4",
                "Weight": "200",
                "Reps": "4",
                "Volume": "800",
                "RPE": "9.5",
                "% 1RM": "91%",
                "E 1RM": "220"
            },
            {
                "Unique ID": "11",
                "Date": "4/6/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Bench Press",
                "Set Number": "5",
                "Weight": "200",
                "Reps": "4",
                "Volume": "800",
                "RPE": "9.5",
                "% 1RM": "91%",
                "E 1RM": "220"
            },
            {
                "Unique ID": "12",
                "Date": "4/6/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Bench Press",
                "Set Number": "6",
                "Weight": "200",
                "Reps": "3",
                "Volume": "600",
                "RPE": "10",
                "% 1RM": "96%",
                "E 1RM": "210"
            },
            {
                "Unique ID": "13",
                "Date": "4/13/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Bench Press",
                "Set Number": "7",
                "Weight": "200",
                "Reps": "3",
                "Volume": "600",
                "RPE": "10",
                "% 1RM": "96%",
                "E 1RM": "210"
            },
            {
                "Unique ID": "14",
                "Date": "4/13/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Arnold Press",
                "Set Number": "1",
                "Weight": "45",
                "Reps": "10",
                "Volume": "450",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            {
                "Unique ID": "15",
                "Date": "4/13/2022",
                "Workout Name": "Push 1",
                "Exercise Name": "Arnold Press",
                "Set Number": "2",
                "Weight": "45",
                "Reps": "10",
                "Volume": "",
                "RPE": "",
                "% 1RM": "",
                "E 1RM": ""
            },
            ]
        
        let newDataPoints = parseVolumeData(data);
        expect(newDataPoints.length).toBe(12)
        expect(newDataPoints.length).not.toBe(15)
        expect(newDataPoints[0].weight).toBe(600);
        expect(newDataPoints[11].weight).toBe(450);

        let startDate = new Date("04/06/2022");
        let maxDataPoints = getMaxVolumeDataPoints(newDataPoints, startDate);
        expect(maxDataPoints.length).toBe(3);
        expect(maxDataPoints[0].weight).toBe(5555);
        expect(maxDataPoints[0].date_string).toBe("4/6/2022")
        expect(maxDataPoints[1].weight).toBe(1050);
        expect(maxDataPoints[1].date_string).toBe("4/13/2022")

    });

  })