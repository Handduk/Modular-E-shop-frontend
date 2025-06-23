import { User } from "../../Models/User";
import { createReseller, DeleteUser, updateUser } from "../../services/userApi";
import { removeStorage } from "../localstorage";

export const defaultReseller: User = {
    id: 0,
    name: "",
    email: "",
    role: "reseller",
};

export const handleChangeReseller = (e: React.ChangeEvent<HTMLInputElement>, setReseller: React.Dispatch<React.SetStateAction<User>>) => {
    const { name, value } = e.target;
    setReseller(
        (prev) =>
            ({
            ...prev,
            [name]: value,
            } as User)
    )
}

export const handlePostReseller = async (
    e: React.FormEvent<HTMLFormElement>,
    reseller: User,
    setCreatedReseller: React.Dispatch<React.SetStateAction<boolean>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    setReseller: React.Dispatch<React.SetStateAction<User>>
) => {
    e.preventDefault();
    const formData = new FormData();

    try {
        if(!formData){
            console.error("Form data is not set correctly.");
            return;
        }
        formData.append("name", reseller.name || "");
        formData.append("email", reseller.email || "");
        const response = await createReseller(formData);
        console.log("Reseller created:", response);
        if (response) {
            setCreatedReseller(true);
            setShow(false);
            setReseller(defaultReseller);
        }
    } catch (error) {
        console.error("Error creating reseller:", error);
    }
}

export const handleUpdateReseller = async (
    e: React.FormEvent<HTMLFormElement>,
    reseller: User,
    setUpdatedReseller: React.Dispatch<React.SetStateAction<boolean>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
    e.preventDefault();
    const formData = new FormData();
    try {
        if(!formData){
            console.error("Form data is not set correctly.");
            return;
        }
        formData.append("id", reseller.id.toString());
        formData.append("name", reseller.name || "");
        formData.append("email", reseller.email || "");
        formData.append("role", reseller.role || "reseller");
        formData.append("passwordHash", reseller.passwordHash || "");

        const response = await updateUser(formData);
        if (response) {
            console.log("Reseller updated:", response);
            setUpdatedReseller(true);
            setShow(false);
        } else {
            console.error("Failed to update reseller.");
        }
    } catch (error) {
        console.error("Error updating reseller:", error);
    }
}

export const handleDeleteReseller = async (
    id: number, 
    setDeletedReseller: React.Dispatch<React.SetStateAction<boolean>>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        if (window.confirm("Vill du verkligen radera denna återförsäljare?")) {
const response = await DeleteUser(id);
        if (response !== 200) {
            console.error("Failed to delete reseller, status code:", response);
        }
        setDeletedReseller(true);
        setShow(false);
        removeStorage("reseller");
        console.log("Reseller deleted successfully.");
        }
    } catch (error) {
        console.error("Error deleting reseller:", error);
    }
}