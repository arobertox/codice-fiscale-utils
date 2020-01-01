import { Validator } from "../../src/";
import { expect } from "../utils";

export default async () => {
    describe("codiceFiscale", () => {
        describe("Generic Validator", () => {
            const cfDateValidator = Validator.codiceFiscale();
            it ("Should validate VRNGNY07D68C351V", () => {
                cfDateValidator.test("VRNGNY07D68C351V").should.be.ok;
            });
            it ("Should validate MRNMIA02E45L219X", () => {
                cfDateValidator.test("MRNMIA02E45L219X").should.be.ok;
            });
        });

        describe("Partial validator", () => {
            it("Should match VRNGNY97A65C351V providing name", () => {
                Validator.codiceFiscale({
                    name: "Genny",
                }).test("VRNGNY97A65C351V").should.be.true;
            });
            it("Should match VRNGNY97A65C351V providing surname, name, gender and place", () => {
                Validator.codiceFiscale({
                    gender: "F",
                    name: "Genny",
                    place: "Catania",
                    surname: "Veronesi",
                }).test("VRNGNY97A65C351V").should.be.true;
            });
            it("Should not match VRNGNY97A35C351V", () => {
                Validator.codiceFiscale({
                    gender: "F",
                    name: "Genny",
                    place: "Catania",
                    surname: "Veronesi",
                }).test("VRNGNY97A35C351V").should.be.false;
            });
            it("Should match KRNZEA02E45L219X", () => {
                Validator.codiceFiscale({
                    day: 5,
                    gender: "F",
                    month: 4,
                    place: "Torino",
                    year: 1902,
                }).test("KRNZEA02E45L219X").should.be.true;
            });
            it("Should not match MRNMIA03E45L219X", () => {
                Validator.codiceFiscale({ year: 1902, month: 4, day: 5, gender: "F", place: "Torino" })
                    .test("MRNMIA03E45L219X").should.be.false;
            });
            it("Should match VRNGNY97A65C351V providing partial surname", () => {
                Validator.codiceFiscale({ surname: "V" })
                    .test("VRNGNY97A65C351V").should.be.true;
            });
            it("Should match VRNGNY97A65C351V providing invalid surname", () => {
                expect(() => Validator.codiceFiscale({ surname: "V@3" })).to.throw("Provided surname is not valid, only letters, diacritics and apostrophe allowed");
            });
        });

        describe("Specific validator", () => {
            it("Should match VRNGNY07D68C351V", () => {
                Validator.codiceFiscale({
                    day: 28,
                    gender: "F",
                    month: 3,
                    name: "Genny",
                    place: "Catania",
                    surname: "Veronesi",
                    year: 1907,
                }).test("VRNGNY07D68C351V").should.be.true;
            });
            it("Should match MRNMIA02E45L219X", () => {
                Validator.codiceFiscale({
                    day: 5,
                    gender: "F",
                    month: 4,
                    name: "Mia",
                    place: "Torino",
                    surname: "Marin",
                    year: 1902,
                }).test("MRNMIA02E45L219X").should.be.true;
            });
        });
    });
};
