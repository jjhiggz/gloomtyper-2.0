import { describe, it, expect } from "vitest"
import { determineLetterState, getCorrectToIndex } from "./typing-test-utils"
describe("determineLetterState", () => {
    it("letter index 0 currentlyTyped 0", () => {

        expect(determineLetterState({
            correctToIndex: 0,
            correctWord: "he",
            currentlyTyped: "",
            letterIndex: 0
        })).toBe("untouched")
    })
    it("no typed words in", () => {

        expect(determineLetterState({

            correctToIndex: 0,
            correctWord: "he",
            currentlyTyped: "",
            letterIndex: 1
        })).toBe("untouched")
    })

    it("letter index 1 with 1 incorrect", () => {
        expect(determineLetterState({
            correctToIndex: 1,
            correctWord: "he",
            currentlyTyped: "ho",
            letterIndex: 1
        })).toBe("wrong")
    })

    it("letter index 2", () => {
        expect(determineLetterState({
            correctToIndex: 1,
            correctWord: "hell",
            currentlyTyped: "hoo",
            letterIndex: 1
        })).toBe("wrong")
    })

    const stateA = {
        correctToIndex: 1,
        correctWord: "hell",
        currentlyTyped: "hoo",
        letterIndex: 2
    }

    it(`state a ${JSON.stringify(stateA)} should be wrong`, () => {
        expect(determineLetterState(stateA)).toBe("wrong")
    })

    const stateB = {
        correctToIndex: 1,
        correctWord: "hell",
        currentlyTyped: "hoo",
        letterIndex: 3
    }

    it(`state b ${JSON.stringify(stateB)} should be wrong`, () => {
        expect(determineLetterState(stateB)).toBe("untouched")
    })

    const stateC = {
        correctToIndex: 1,
        correctWord: "abc",
        currentlyTyped: "aa",
        letterIndex: 1
    }

    it(`state c ${JSON.stringify(stateC)} should be wrong`, () => {
        expect(determineLetterState(stateC)).toBe("wrong")
    })

    const stateD = {
        correctToIndex: 1,
        correctWord: "abc",
        currentlyTyped: "aa",
        letterIndex: 2
    }

    it(`state d ${JSON.stringify(stateD)} should be wrong`, () => {
        expect(determineLetterState(stateD)).toBe("untouched")
    })

    const stateE = {
        correctToIndex: 1,
        correctWord: "abc",
        currentlyTyped: "aaa",
        letterIndex: 1
    }

    it(`state e ${JSON.stringify(stateE)} should be wrong`, () => {
        expect(determineLetterState(stateE)).toBe("wrong")
    })

    it(`state d ${JSON.stringify(stateD)} should be wrong`, () => {
        expect(determineLetterState(stateD)).toBe("untouched")
    })


    // expect(determineLetterState({
    //     correctToIndex: 1,
    //     correctWord: "hell",
    //     currentlyTyped: "hoo",
    //     letterIndex: 3
    // })).toBe("wrong")
})
it("should show correct letters", () => {
    expect(determineLetterState({
        correctToIndex: 1,
        correctWord: "he",
        currentlyTyped: "ho",
        letterIndex: 0
    })).toBe("correct")

})

describe("getCorrectTo", () => {
    it("should give me the correct value", () => {
        expect(getCorrectToIndex({
            correct: "hello",
            current: "hi_my_friend"
        })).toBe(1)
        expect(getCorrectToIndex({
            correct: "hello",
            current: "hem"
        })).toBe(2)
        expect(getCorrectToIndex({
            correct: "hello",
            current: "hemoglobyn"
        })).toBe(2)
    })
    it("should do shit", () => {
        expect(getCorrectToIndex({
            correct: "hello",
            current: 'helly'
        })).toBe(4)
    })
})