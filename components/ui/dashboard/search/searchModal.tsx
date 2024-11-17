'use client'
import { useState, useEffect } from "react"
import { UserCheck2 } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { customerData } from "@/constants/Data"

interface SearchModalProps {
    onSelectCustomer: (customer: CustomerData) => void;
}

const SearchModal = ({ onSelectCustomer }: SearchModalProps) => {
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<CustomerData[]>([])

    useEffect(() => {
        if (searchQuery) {
            setLoading(true)
            const results = customerData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            setSearchResults(results)
            setLoading(false)
        } else {
            setSearchResults([])
        }
    }, [searchQuery])

    const handleInputChange = (search: string) => {
        setSearchQuery(search)
    }

    const handleSelectCustomer = (customer: CustomerData) => {
        onSelectCustomer(customer)
        setSearchQuery('')
        setSearchResults([])
    }

    return (
        <Command className="rounded-lg border shadow-md md:min-w-[450px]" shouldFilter={false}>
            <CommandInput
                placeholder="Enter customer name"
                value={searchQuery}
                onValueChange={handleInputChange}
            />
            <CommandList>
                {loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <>
                        <CommandGroup>
                            {searchResults.length > 0 ? (searchResults.map((customer) => (
                                <CommandItem key={customer.id} onSelect={() => handleSelectCustomer(customer)}>
                                    <UserCheck2 className="mr-2 h-4 w-4" />
                                    <span>{customer.name}</span>
                                </CommandItem>
                            ))) : (
                                <CommandEmpty>No results found</CommandEmpty>
                            )}
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </Command>
    )
}

export default SearchModal