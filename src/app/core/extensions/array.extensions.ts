interface Array<T> {
    toSelect2Elements: (labelKey: string, valueKey: string) => { label: string, value: string }[];
}

Array.prototype.toSelect2Elements = function(labelKey, valueKey) {
    return this.map(el => {
        return { label: el[labelKey], value: el[valueKey] };
    });
}
