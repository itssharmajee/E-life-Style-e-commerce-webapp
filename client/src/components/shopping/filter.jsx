import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
    return <div className="bg-background rounded-lg shadow-sm">
        <div className="p-2 border-b">
            <h2 className="text-lg font-extrabold ">Filters</h2>
        </div>
        <div>
            {
                Object.keys(filterOptions).map((item) => (
                    <Fragment>
                        <div>
                            <h3 className="text-base font-semibold ">{item}</h3>
                            <div className="grid gap-2 mt-3">
                                {
                                    filterOptions[item].map((option) => (
                                        <Label className='flex font-normal items-center gap-2  '>

                                            <Checkbox
                                                checked={
                                                    filters && Object.keys(filters).length > 0 && filters[item] &&
                                                    filters[item].indexOf(option.id) > -1
                                                }
                                                onCheckedChange={() => handleFilter(item, option.id)} />
                                            {option.label}
                                        </Label>
                                    ))
                                }
                            </div>
                        </div>
                        <Separator className='my-2' />
                    </Fragment>
                ))
            }
        </div>

    </div>;
}

export default ProductFilter;
