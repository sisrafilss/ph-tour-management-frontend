import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

const TourFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || "";
  const selectedTourType = searchParams.get("tourType") || "";

  const { data: divisionData } = useGetDivisionsQuery({ limit: 1000 });
  const { data: tourTypeData } = useGetTourTypesQuery({ limit: 1000 });

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };
  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };

  return (
    <div className="col-span-3 border rounded p-5">
      <div className="w-full flex justify-between mb-5 items-center">
        <h1>Filter</h1>
        <div>
          <Button onClick={handleClearFilter} variant="outline" size="sm">
            Clear Filter
          </Button>
        </div>
      </div>

      <div>
        <div>
          <Select
            onValueChange={(value) => handleDivisionChange(value)}
            value={selectedDivision ? selectedDivision : ""}
          >
            <Label className="mb-2">Division to Visit</Label>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {divisionData?.map((division: { _id: string; name: string }) => (
                <SelectItem key={division._id} value={division._id}>
                  {division.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          {" "}
          <Select
            onValueChange={(value) => handleTourTypeChange(value)}
            value={selectedTourType ? selectedTourType : ""}
          >
            <Label className="mb-2">Tour Type</Label>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tourTypeData?.data?.map(
                (tourType: { _id: string; name: string }) => (
                  <SelectItem key={tourType._id} value={tourType._id}>
                    {tourType.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TourFilters;
