"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Controller, useForm, useWatch } from "react-hook-form";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useCreateRoomModalStore } from "@/store/create-room.store";
import { useCreateRoom } from "@/hooks/useCreateRoom";
import {
  createRoomSchema,
  type CreateRoomFormData,
} from "@/schemas/create-room.schema";
import {
  ROOM_MEMBER_LIMIT_MAX,
  ROOM_MEMBER_LIMIT_MIN,
} from "@/constants/ui";

interface FieldErrorProps {
  id?: string;
  error?: string;
}

function FieldError({ id, error }: FieldErrorProps) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
          className="text-xs text-destructive"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function CreateRoomDialog() {
  const isOpen = useCreateRoomModalStore((state) => state.isOpen);
  const closeModal = useCreateRoomModalStore((state) => state.close);
  const { mutate, isPending } = useCreateRoom();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    mode: "onChange",
    defaultValues: {
      roomName: "",
      description: "",
      roomType: "PUBLIC",
      password: "",
      memberLimit: undefined,
    },
  });

  const roomType = useWatch({ control, name: "roomType" });

  const onSubmit = (data: CreateRoomFormData) => {
    mutate(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isPending) {
          closeModal();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100%-2rem)] overflow-y-auto sm:max-w-md"
      >
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-2 right-2"
              disabled={isPending}
              aria-label="Close"
            />
          }
        >
          <X />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
          <DialogDescription>
            Start a new conversation. Choose a name, describe it, and invite
            people to join.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="room-name">Room Name</Label>
            <Input
              id="room-name"
              placeholder="e.g. The Midnight Lounge"
              autoComplete="off"
              disabled={isPending}
              aria-invalid={!!errors.roomName}
              aria-describedby={errors.roomName ? "room-name-error" : undefined}
              {...register("roomName")}
            />
            <FieldError id="room-name-error" error={errors.roomName?.message} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-description">Description</Label>
            <Textarea
              id="room-description"
              placeholder="What is this room about?"
              rows={3}
              disabled={isPending}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "room-description-error" : undefined
              }
              {...register("description")}
            />
            <FieldError
              id="room-description-error"
              error={errors.description?.message}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-type">Room Type</Label>
            <Controller
              control={control}
              name="roomType"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <SelectTrigger
                    id="room-type"
                    className="w-full"
                    aria-invalid={!!errors.roomType}
                  >
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError id="room-type-error" error={errors.roomType?.message} />
          </div>

          <AnimatePresence initial={false}>
            {roomType === "PRIVATE" && (
              <motion.div
                key="password"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="room-password">Password</Label>
                  <Input
                    id="room-password"
                    type="password"
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    disabled={isPending}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "room-password-error" : undefined
                    }
                    {...register("password")}
                  />
                  <FieldError
                    id="room-password-error"
                    error={errors.password?.message}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <Label htmlFor="room-member-limit">
              Member Limit{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Input
              id="room-member-limit"
              type="number"
              min={ROOM_MEMBER_LIMIT_MIN}
              max={ROOM_MEMBER_LIMIT_MAX}
              placeholder={`${ROOM_MEMBER_LIMIT_MIN} – ${ROOM_MEMBER_LIMIT_MAX}`}
              disabled={isPending}
              aria-invalid={!!errors.memberLimit}
              aria-describedby={
                errors.memberLimit ? "room-member-limit-error" : undefined
              }
              {...register("memberLimit", { valueAsNumber: true })}
            />
            <FieldError
              id="room-member-limit-error"
              error={errors.memberLimit?.message}
            />
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              disabled={isPending || !isValid}
              className="gap-2"
            >
              {isPending ? (
                <>
                  <LoadingSpinner size="sm" />
                  Creating...
                </>
              ) : (
                "Create Room"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
