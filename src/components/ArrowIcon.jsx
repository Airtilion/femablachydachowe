const ArrowIcon = ({ id, open }) => {
    return (
        <div className="bg-[#A3886E] rounded-full p-[4px] max-sm:p-[2px]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#1A1A1A"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform flex-1 max-sm:w-[14px] max-sm:h-[14px]`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

        </div>
    );
}

export default ArrowIcon