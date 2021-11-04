import Select from "react-select"

const CustomSelect = ({ onChange, value, options }) => {
    //
    const defaultArtistValue = (options, value) => {
        return options ? options.find(option => option.value === value) : ''
    }

    return (
        <div>
            <Select
                value={defaultArtistValue(options, value)}
                onChange={value => {
                    onChange(value)

                }} options={options} />
        </div>
    )
}

export default CustomSelect
