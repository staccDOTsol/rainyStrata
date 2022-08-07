import React from "react";
import * as yup from "yup";
export interface ITokenFormValues {
    isExisting: boolean;
    type: "native" | "token";
    amount: number;
    mint: string;
    startingPrice?: number;
    legalDisclosure?: boolean;
}
export interface ITokenFormProps {
    defaultValues: any;
    onSubmit: (data: any) => void;
    onBack: () => void;
}
export declare const validationSchema: (isExisting: boolean) => import("yup/lib/object").RequiredObjectSchema<{
    mint: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    amount: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
} | {
    startingPrice: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    legalDisclosure: yup.BooleanSchema<boolean | undefined, import("yup/lib/types").AnyObject, boolean | undefined>;
    amount: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    mint: import("yup/lib/string").RequiredStringSchema<string | undefined, import("yup/lib/types").AnyObject>;
    amount: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
} | {
    startingPrice: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
    legalDisclosure: yup.BooleanSchema<boolean | undefined, import("yup/lib/types").AnyObject, boolean | undefined>;
    amount: import("yup/lib/number").RequiredNumberSchema<number | undefined, import("yup/lib/types").AnyObject>;
}>>;
export declare const TokenForm: React.FC<ITokenFormProps>;
//# sourceMappingURL=TokenForm.d.ts.map