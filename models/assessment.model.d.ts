export interface Quiz {
    readonly id: string;
    kind: "quiz";
    title: string;
    correctAnswers: number;
    totalQuestions: number;
}
export interface LabAssignment {
    readonly id: string;
    kind: "lab";
    title: string;
    functionalityScore: number;
    codeQualityScore: number;
}
export type AssessmentItem = Quiz | LabAssignment;
export declare function calculateGrade(item: AssessmentItem): number;
//# sourceMappingURL=assessment.model.d.ts.map